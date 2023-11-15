import { Hono } from "hono";
import { Bindings } from "../types/worker";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { exchangeToken } from "../lib/auth";
import { decode } from "@tsndr/cloudflare-worker-jwt";
import { createUser, getUserByEmail } from "../db/user";
import { createSlackUser } from "../db/slack";
import { createId } from "@paralleldrive/cuid2";
import Success from "../pages/success";

export const auth = new Hono<{ Bindings: Bindings }>()
    .get(
        "/sign-in",
        zValidator(
            "query",
            z.object({
                team: z.string().optional(),
                user: z.string().optional(),
            })
        ),

        (c) => {
            const { team, user } = c.req.valid("query");

            // If both `team` and `user` are present, add a special `state`
            // parameter to the OAuth request.
            const state = team && user ? `&state=${team}:${user}` : "";

            return c.redirect(
                `https://accounts.google.com/o/oauth2/v2/auth?client_id=${c.env.GCP_CLIENT_ID}&redirect_uri=${c.env.REDIRECT_URI}&response_type=code&prompt=consent&access_type=offline&scope=openid%20email%20profile%20https://www.googleapis.com/auth/calendar${state}`
            );
        }
    )
    .get(
        "/callback",
        zValidator(
            "query",
            z.object({
                state: z.string().optional(),
                code: z.string(),
                scope: z.string(),
                authuser: z.string(),
                prompt: z.union([z.literal("consent"), z.literal("none")]),
            })
        ),

        async (c) => {
            const { state, code, scope } = c.req.valid("query");
            const [teamId, userId] = state ? state.split(":") : [];

            // Check if the required scopes are present.
            if (!scope.includes("calendar")) {
                return c.text("Invalid scope. `calendar` is required.");
            }

            // Get both the access and the refresh token for the freshly
            // authenticated user.
            const token = await exchangeToken(c, code);

            // Decode the received `id_token` to get the user details.
            const { payload } = decode(token.id_token);

            // Check if the user already exists inside the database.
            let user = await getUserByEmail(c, payload.email);

            // If the user does not exist, create a new one.
            if (!user) {
                user = await createUser(c, {
                    id: crypto.randomUUID(),
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    email: payload.email,
                    firstName: payload.given_name,
                    lastName: payload.family_name,
                    picture: payload.picture,
                    accessToken: token.access_token,
                    refreshToken: token.refresh_token,
                    token: createId(),
                });
            }

            // If both a `teamId` and a `userId` are present, create a new
            // Slack user and link it to the Google user.
            const slackUser =
                teamId && userId
                    ? await createSlackUser(c, {
                          id: crypto.randomUUID(),
                          createdAt: Date.now(),
                          updatedAt: Date.now(),
                          user: user.id,
                          slack_team: teamId,
                          slack_user: userId,
                      })
                    : null;

            return c.html(<Success user={user} slackUser={slackUser} />);
        }
    );

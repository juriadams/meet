import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { exchangeToken } from "./lib/auth";
import { Bindings } from "./types/worker";
import { decode } from "@tsndr/cloudflare-worker-jwt";
import {
    createUser,
    getUserByEmail,
    getUserByToken,
    getUserForSlackUser,
} from "./db/user";
import { createMeet } from "./lib/meet";
import { createSlackUser, getSlackUser } from "./db/slack";
import { createId } from "@paralleldrive/cuid2";

const app = new Hono<{ Bindings: Bindings }>()
    // Sign in with Google.
    .get(
        "/auth/sign-in",

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

    // OAuth callback, creates users if they don't exist.
    .get(
        "/auth/callback",

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

            return c.json({ user: user.id, slack_user: slackUser?.id });
        }
    )

    // Generate a new Google Meet link.
    .get("/create", async (c) => {
        const token = c.req.header("Authorization");
        if (!token) return c.json({ error: "Missing Authorization header." });

        const user = await getUserByToken(c, token.replace("Bearer ", ""));
        if (!user) return c.json({ error: "Invalid token." });

        const meet = await createMeet(c, user);

        return c.json(meet);
    })

    .post(
        "/slack/commands",

        zValidator(
            "form",
            z.object({
                token: z.string(),
                team_id: z.string(),
                team_domain: z.string(),
                channel_id: z.string(),
                channel_name: z.string(),
                user_id: z.string(),
                user_name: z.string(),
                command: z.string(),
                text: z.string(),
                api_app_id: z.string(),
                is_enterprise_install: z.string(),
                response_url: z.string(),
                trigger_id: z.string(),
            })
        ),

        async (c) => {
            const { team_id, user_id } = c.req.valid("form");

            const slackUser = await getSlackUser(c, team_id, user_id);
            if (!slackUser) {
                return c.json({
                    response_type: "ephemeral",
                    blocks: [
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: "Please sign in to create new Google Meets!",
                            },
                        },
                        {
                            type: "actions",
                            elements: [
                                {
                                    type: "button",
                                    text: {
                                        type: "plain_text",
                                        text: "Sign in",
                                    },
                                    url: `https://meet.jrdms.workers.dev/auth/sign-in?team=${team_id}&user=${user_id}`,
                                },
                            ],
                        },
                    ],
                });
            }

            const user = await getUserForSlackUser(c, slackUser);
            if (!user) {
                // TODO: Delete the existing `SlackUser` and create a new one.
                return c.json({
                    response_type: "ephemeral",
                    blocks: [
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: "Please sign in to create new Google Meets!",
                            },
                        },
                        {
                            type: "actions",
                            elements: [
                                {
                                    type: "button",
                                    text: {
                                        type: "plain_text",
                                        text: "Sign in",
                                    },
                                    url: `https://meet.jrdms.workers.dev/auth/sign-in?team=${team_id}&user=${user_id}`,
                                },
                            ],
                        },
                    ],
                });
            }

            const meet = await createMeet(c, user);

            return c.json({
                response_type: "in_channel",
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: `*<@${user_id}> started a new Google Meet!*\n<${
                                meet.url
                            }|${meet.url.replace("https://", "")}>`,
                        },
                    },
                ],
            });
        }
    );

export default app;

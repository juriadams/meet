import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { exchangeToken, refreshToken } from "./lib/auth";
import { Bindings } from "./types/worker";
import { decode } from "@tsndr/cloudflare-worker-jwt";
import { createUser, getUserByEmail } from "./db/user";
import { createEvent, deleteEvent, getPrimaryCalendar } from "./lib/calendar";

const app = new Hono<{ Bindings: Bindings }>();

app
    // Sign in with Google.
    .get("/auth/sign-in", (c) =>
        c.redirect(
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=${c.env.GCP_CLIENT_ID}&redirect_uri=${c.env.REDIRECT_URI}&response_type=code&prompt=consent&access_type=offline&scope=openid%20email%20profile%20https://www.googleapis.com/auth/calendar`
        )
    )

    // OAuth callback, creates users if they don't exist.
    .get(
        "/auth/callback",

        zValidator(
            "query",
            z.object({
                code: z.string(),
                scope: z.string(),
                authuser: z.string(),
                prompt: z.union([z.literal("consent"), z.literal("none")]),
            })
        ),

        async (c) => {
            const { code, scope } = c.req.valid("query");

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
                });
            }

            return c.json({ token, payload, user });
        }
    )

    // Generate a new Google Meet link.
    .get("/create", async (c) => {
        const user = await getUserByEmail(c, "juri.adams@googlemail.com");

        if (!user) return c.json({ error: "Could not find user." });

        const token = await refreshToken(c, user.refreshToken);
        const calendar = await getPrimaryCalendar(token.access_token);
        const event = await createEvent(token.access_token, calendar.id);

        // Delete the event while continuing processing the request.
        c.executionCtx.waitUntil(
            deleteEvent(token.access_token, calendar.id, event.id)
        );

        return c.json({
            host: user.email,
            url: event.hangoutLink,
        });
    });

export default app;

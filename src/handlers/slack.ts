import { Hono } from "hono";
import { Bindings } from "../types/worker";
import { createMeet } from "../lib/meet";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getSlackUser } from "../db/slack";
import { getUserForSlackUser } from "../db/user";

export const slack = new Hono<{ Bindings: Bindings }>().post(
    "/commands",
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
                                url: `https://meet.jrd.ms/auth/sign-in?team=${team_id}&user=${user_id}`,
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
                                url: `https://meet.jrd.ms/auth/sign-in?team=${team_id}&user=${user_id}`,
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

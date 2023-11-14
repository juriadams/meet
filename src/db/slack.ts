import { Context } from "hono";
import { Bindings } from "../types/worker";
import { db } from ".";
import { slackUsers } from "../../db/schema";
import { and, eq } from "drizzle-orm";

export type SlackUser = typeof slackUsers.$inferSelect;
export type NewSlackUser = typeof slackUsers.$inferInsert;

/**
 * Get a Slack user by their `team_id` and `user_id`.
 *
 * @param c Request context.
 * @param team The `team_id` of the Slack user.
 * @param user The `user_id` of the Slack user.
 *
 * @returns Promise resolving the full `User` or `null`.
 */
export const getSlackUser = async (
    c: Context<{ Bindings: Bindings }>,
    team: string,
    user: string
): Promise<SlackUser | null> => {
    const start = Date.now();

    const slackUser = await db(c)
        .select()
        .from(slackUsers)
        .where(
            and(
                eq(slackUsers.slack_team, team),
                eq(slackUsers.slack_user, user)
            )
        )
        .limit(1)
        .then((users) => users[0] || null);

    console.log(`get slack user: ${Date.now() - start}ms`);

    return slackUser;
};

/**
 * Create a new `User`.
 *
 * @param c Request context.
 * @param user Details of the user to add to the database.
 *
 * @returns Promise resolving the freshly created `SlackUser`.
 */
export const createSlackUser = async (
    c: Context<{ Bindings: Bindings }>,
    user: NewSlackUser
): Promise<SlackUser> => {
    const start = Date.now();

    const newUser = await db(c)
        .insert(slackUsers)
        .values(user)
        .returning()
        .then((users) => users[0]);

    console.log(`create slack user: ${Date.now() - start}ms`);

    return newUser;
};

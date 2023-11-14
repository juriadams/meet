import { Context } from "hono";
import { Bindings } from "../types/worker";
import { User } from "../db/user";
import { refreshToken } from "./auth";
import { createEvent, deleteEvent, getPrimaryCalendar } from "./calendar";
import { Meet } from "../types/meet";

/**
 * Create a new Google Meet.
 *
 * @param c Request context.
 * @param user `User` to create the Meet for.
 *
 * @returns Promise resolving to a `Meet` object.
 */
export const createMeet = async (
    c: Context<{ Bindings: Bindings }>,
    user: User
): Promise<Meet> => {
    const token = await refreshToken(c, user.refreshToken);
    const calendar = await getPrimaryCalendar(token.access_token);
    const event = await createEvent(token.access_token, calendar.id);

    // Delete the event while continuing processing the request.
    c.executionCtx.waitUntil(
        deleteEvent(token.access_token, calendar.id, event.id)
    );

    return {
        host: user.email,
        url: event.hangoutLink,
    };
};

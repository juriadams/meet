import { Calendar, Event } from "../types/calendar";

/**
 * Get all calendars for the authenticated user.
 *
 * @param accessToken Access token for the authenticated user.
 *
 * @returns Promise resolving to an array of `Calendar` objects.
 */
export const getCalendars = async (
    accessToken: string
): Promise<Calendar[]> => {
    const start = Date.now();

    const calendars = await fetch(
        `https://www.googleapis.com/calendar/v3/users/me/calendarList`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )
        .then((res) => res.json() as unknown as { items: Calendar[] })
        .then((res) => res.items);

    console.log(`get calendars: ${Date.now() - start}ms`);

    return calendars;
};

/**
 * Get the primary calendar for the authenticated user.
 *
 * @param accessToken Access token for the authenticated user.
 *
 * @returns Promise resolving to a `Calendar` object.
 */
export const getPrimaryCalendar = async (
    accessToken: string
): Promise<Calendar> =>
    getCalendars(accessToken).then(
        (res) => res.find((item: any) => item.primary) as Calendar
    );

/**
 * Create a new event on the given calendar.
 *
 * @param accessToken Access token for the authenticated user.
 * @param calendar Calendar to create the event on.
 *
 * @returns Promise resolving to an `Event` object.
 */
export const createEvent = async (
    accessToken: string,
    calendar: string
): Promise<Event> => {
    const start = Date.now();

    const event = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events?conferenceDataVersion=1`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                start: {
                    dateTime: new Date().toISOString(),
                    timeZone: "UTC",
                },
                end: {
                    dateTime: new Date().toISOString(),
                    timeZone: "UTC",
                },
                conferenceData: {
                    createRequest: {
                        requestId: crypto.randomUUID(),
                        conferenceSolutionKey: {
                            type: "hangoutsMeet",
                        },
                    },
                },
            }),
        }
    ).then((res) => res.json() as unknown as Event);

    console.log(`create event: ${Date.now() - start}ms`);

    return event;
};

/**
 * Delete an event from the given calendar.
 *
 * @param accessToken Access token for the authenticated user.
 * @param calendar The calendar to delete the event from.
 * @param event The event to delete.
 *
 * @returns Promise resolving to `null`.
 */
export const deleteEvent = async (
    accessToken: string,
    calendar: string,
    event: string
) => {
    const start = Date.now();

    await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events/${event}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    console.log(`delete event: ${Date.now() - start}ms`);

    return null;
};

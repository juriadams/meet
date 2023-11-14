import { Calendar, Event } from "../types/calendar";

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
        .then((res) => res.json<{ items: Calendar[] }>())
        .then((res) => res.items);

    console.log(`get calendars: ${Date.now() - start}ms`);

    return calendars;
};

export const getPrimaryCalendar = async (
    accessToken: string
): Promise<Calendar> =>
    getCalendars(accessToken).then(
        (res) => res.find((item: any) => item.primary) as Calendar
    );

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

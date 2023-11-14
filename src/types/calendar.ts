export interface Reminder {
    method: string;
    minutes: number;
}

export interface Notification {
    type: string;
    method: string;
}

export interface NotificationSettings {
    notifications: Notification[];
}

export interface ConferenceProperties {
    allowedConferenceSolutionTypes: string[];
}

export interface Calendar {
    kind: string;
    etag: string;
    id: string;
    summary: string;
    timeZone: string;
    colorId: string;
    backgroundColor: string;
    foregroundColor: string;
    selected: boolean;
    accessRole: string;
    defaultReminders: Reminder[];
    notificationSettings: NotificationSettings;
    primary: boolean;
    conferenceProperties: ConferenceProperties;
}

export interface Creator {
    email: string;
    self: boolean;
}

export interface Organizer {
    email: string;
    self: boolean;
}

export interface DateTimeInfo {
    dateTime: string;
    timeZone: string;
}

export interface ConferenceData {
    createRequest: CreateRequest;
    entryPoints: EntryPoint[];
    conferenceSolution: ConferenceSolution;
    conferenceId: string;
}

export interface CreateRequest {
    requestId: string;
    conferenceSolutionKey: ConferenceSolutionKey;
    status: Status;
}

export interface ConferenceSolutionKey {
    type: string;
}

export interface Status {
    statusCode: string;
}

export interface EntryPoint {
    entryPointType: string;
    uri: string;
    label: string;
}

export interface ConferenceSolution {
    key: ConferenceSolutionKey;
    name: string;
    iconUri: string;
}

export interface Reminders {
    useDefault: boolean;
}

export interface Event {
    kind: string;
    etag: string;
    id: string;
    status: string;
    htmlLink: string;
    created: string;
    updated: string;
    creator: Creator;
    organizer: Organizer;
    start: DateTimeInfo;
    end: DateTimeInfo;
    iCalUID: string;
    sequence: number;
    hangoutLink: string;
    conferenceData: ConferenceData;
    reminders: Reminders;
    eventType: string;
}

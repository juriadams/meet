import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
    "users",
    {
        id: text("id").primaryKey().notNull(),
        createdAt: integer("createdAt").default(
            sql`(cast (unixepoch () as int))`
        ),
        updatedAt: integer("updatedAt").default(
            sql`(cast (unixepoch () as int))`
        ),
        email: text("email").notNull(),
        firstName: text("firstName"),
        lastName: text("lastName"),
        picture: text("picture"),
        accessToken: text("accessToken").notNull(),
        refreshToken: text("refreshToken").notNull(),
        token: text("token").notNull(),
    },
    (users) => ({
        idIndex: index("id_index").on(users.id),
    })
);

export const slackUsers = sqliteTable(
    "slack_users",
    {
        id: text("id").primaryKey().notNull(),
        createdAt: integer("createdAt").default(
            sql`(cast (unixepoch () as int))`
        ),
        updatedAt: integer("updatedAt").default(
            sql`(cast (unixepoch () as int))`
        ),
        user: text("user").notNull(),
        slack_team: text("slack_team").notNull(),
        slack_user: text("slack_user").notNull(),
    },
    (slackUsers) => ({
        idIndex: index("id_index").on(slackUsers.id),
    })
);

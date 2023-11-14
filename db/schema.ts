import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
    "users",
    {
        id: text("id").primaryKey(),
        createdAt: integer("createdAt").default(
            sql`(cast (unixepoch () as int))`
        ),
        updatedAt: integer("updatedAt").default(
            sql`(cast (unixepoch () as int))`
        ),
        email: text("email"),
        firstName: text("firstName"),
        lastName: text("lastName"),
        picture: text("picture"),
        accessToken: text("accessToken"),
        refreshToken: text("refreshToken"),
    },
    (users) => ({
        idIndex: index("id_index").on(users.id),
    })
);

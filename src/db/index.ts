import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/http";
import { Context } from "hono";
import { Bindings } from "../types/worker";

import * as schema from "../../db/schema";

/**
 * Create a new database client.
 *
 * @param c Request context.
 *
 * @returns A new database client.
 */
export const db = (c: Context<{ Bindings: Bindings }>) =>
    drizzle(createClient({ url: c.env.DB_URL, authToken: c.env.DB_TOKEN }), {
        schema,
    });

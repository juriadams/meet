import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/http";
import { Context } from "hono";
import { Bindings } from "../types/worker";

import * as schema from "../../db/schema";

export const db = (c: Context<{ Bindings: Bindings }>) =>
    drizzle(createClient({ url: c.env.DB_URL, authToken: c.env.DB_TOKEN }), {
        schema,
    });

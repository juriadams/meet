import { Hono } from "hono";
import { Bindings } from "../types/worker";
import { getUserByToken } from "../db/user";
import { createMeet } from "../lib/meet";

export const meet = new Hono<{ Bindings: Bindings }>().post(
    "/create",
    async (c) => {
        const token = c.req.header("Authorization");
        if (!token) return c.json({ error: "Missing Authorization header." });

        const user = await getUserByToken(c, token.replace("Bearer ", ""));
        if (!user) return c.json({ error: "Invalid token." });

        const meet = await createMeet(c, user);

        return c.json(meet);
    }
);

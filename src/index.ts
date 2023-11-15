import { Hono } from "hono";
import { Bindings } from "./types/worker";

import { meet } from "./handlers/meet";
import { auth } from "./handlers/auth";
import { slack } from "./handlers/slack";
import { index } from "./pages";

const app = new Hono<{ Bindings: Bindings }>()
    .get("/", index)

    // Handle authentication related requests.
    .route("/auth", auth)

    // Handle meeting related requests.
    .route("/meet", meet)

    // Handle Slack related requests.
    .route("/slack", slack);

export default app;

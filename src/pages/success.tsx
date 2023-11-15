import { FC } from "hono/jsx";
import { User, getUserByEmail } from "../db/user";
import { SlackUser } from "../db/slack";
import { Layout } from "./components/Layout";
import { Context } from "hono";
import { Bindings } from "../types/worker";

const Success: FC<{ user: User; slackUser: SlackUser | null }> = ({
    user,
    slackUser,
}) => {
    return (
        <Layout>
            <div class="max-w-lg">
                <div class="space-y-8">
                    <div class="space-y-4">
                        <h1 class="text-5xl">Success!</h1>
                        <p class="text-lg font-light text-slate-500">
                            You have successfully authenticated with Google. You
                            can now make API requests using the access token
                            below.
                        </p>
                    </div>

                    <div class="space-y-1.5">
                        <h2 class="text-xs text-slate-400 ml-1">
                            Create new Google Meet
                        </h2>

                        <pre class="px-3 py-2 text-sm bg-slate-100 rounded-md text-black hover:text-slate-400 transition">
                            <code>
                                curl -X POST https://meet.jrd.ms/meet/create \
                                <br />
                                {"    "}-H 'Authorization: Bearer{" "}
                                <span class="text-black">{user.token}</span>'
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Success;

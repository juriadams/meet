import { Context } from "hono";
import { Bindings } from "../types/worker";
import { Layout } from "./components/Layout";
import Chat from "./components/Chat";

export const index = (c: Context<{ Bindings: Bindings }>) =>
    c.html(
        <Layout>
            <div class="max-w-lg">
                <div class="space-y-8">
                    <div class="space-y-4">
                        <h1 class="text-5xl">Meet</h1>
                        <p class="text-lg font-light text-slate-500">
                            A straightforward Slack app and web service to
                            create personalized Google Meet links.
                        </p>
                    </div>

                    <div class="space-y-1.5">
                        <Chat />

                        <p class="ml-1 text-xs space-x-3">
                            <a
                                class="text-slate-400 hover:text-slate-500 transition"
                                href="/auth/sign-in"
                            >
                                API
                            </a>

                            <a
                                class="text-slate-400 hover:text-slate-500 transition"
                                href="/privacy"
                            >
                                Privacy Policy
                            </a>

                            <a
                                class="text-slate-400 hover:text-slate-500 transition"
                                href="https://github.com/juriadams/meet"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );

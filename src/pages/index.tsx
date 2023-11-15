import { Context } from "hono";
import { Bindings } from "../types/worker";
import { Layout } from "./components/Layout";
import Chat from "./components/Chat";
import Link from "./components/Link";

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
                            <Link href="/auth/sign-in">API</Link>

                            <Link href="/privacy">Privacy</Link>

                            <Link href="/terms">Terms of Service</Link>

                            <Link
                                href="https://github.com/juriadams/meet"
                                target="_blank"
                            >
                                GitHub
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );

import { Context } from "hono";
import { Bindings } from "../types/worker";
import { Layout } from "./components/Layout";

export const terms = (c: Context<{ Bindings: Bindings }>) =>
    c.html(
        <Layout>
            <div class="max-w-lg">
                <h1 class="text-2xl">Terms of Service</h1>
                <p class="text-sm text-slate-600 my-4">
                    Last updated: November 15, 2023
                </p>

                <h2 class="text-xl mt-8">1. Agreement to Terms</h2>
                <p class="text-sm text-slate-600 my-4">
                    By using our Services, you agree to be bound by these Terms
                    of Service. If you don’t agree to be bound by these Terms,
                    do not use our Services.
                </p>

                <h2 class="text-xl mt-8">2. Changes to Terms</h2>
                <p class="text-sm text-slate-600 my-4">
                    We reserve the right to modify, amend or update these terms
                    at any time and for any reason. If we make significant
                    changes that affect your rights and obligations, we will
                    notify you.
                </p>

                <h2 class="text-xl mt-8">3. Privacy Policy</h2>
                <p class="text-sm text-slate-600 my-4">
                    Please refer to our Privacy Policy for information about how
                    we collect, use, and disclose your information. The terms of
                    the privacy policy are incorporated herein by reference.
                </p>

                <h2 class="text-xl mt-8">4. Termination</h2>
                <p class="text-sm text-slate-600 my-4">
                    We reserve the right to terminate your use of the Service or
                    any related website for violating any of the prohibited
                    uses.
                </p>

                <h2 class="text-xl mt-8">5. Limitation of Liability</h2>
                <p class="text-sm text-slate-600 my-4">
                    In no event shall the Company, nor its directors, employees,
                    partners, agents, suppliers, or affiliates, be liable for
                    any indirect, incidental, special, consequential or punitive
                    damages, including without limitation, loss of profits,
                    data, use, goodwill, or other intangible losses.
                </p>

                <h2 class="text-xl mt-8">6. Contact Us</h2>
                <p class="text-sm text-slate-600 my-4">
                    If you have any questions or comments about these Terms,
                    please contact us at contact@jrd.ms.
                </p>
            </div>
        </Layout>
    );

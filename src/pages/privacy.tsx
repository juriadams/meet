import { Context } from "hono";
import { Bindings } from "../types/worker";
import { Layout } from "./components/Layout";

export const privacy = (c: Context<{ Bindings: Bindings }>) =>
    c.html(
        <Layout>
            <div class="max-w-lg">
                <h1 class="text-2xl">Privacy Policy</h1>
                <p class="text-sm text-slate-600 my-4">
                    Last updated: November 15, 2023
                </p>

                <p class="text-sm text-slate-600 my-4">
                    We are committed to protecting your personal information and
                    your right to privacy. If you have any questions or concerns
                    about our policy, or our practices with regard to your
                    personal information, please contact us at contact@jrd.ms.
                </p>

                <p class="text-sm text-slate-600 my-4">
                    This Privacy Policy applies to all information collected
                    through our Slack App, and/or any related services, sales,
                    marketing or events (we refer to them collectively in this
                    Privacy Policy as the "Services").
                </p>

                <p class="text-sm text-slate-600 my-4">
                    Please read this privacy policy carefully as it will help
                    you make informed decisions about sharing your personal
                    information with us.
                </p>

                <h2 class="text-xl mt-8">1. What information do we collect?</h2>
                <p class="text-sm text-slate-600 my-4">
                    The only information collected by our Services is Google
                    OAuth information in order to generate personalized Google
                    Meet links. Our application does not request, collect, or
                    access any further personal information.
                </p>

                <h2 class="text-xl mt-8">2. How do we use your information?</h2>
                <p class="text-sm text-slate-600 my-4">
                    We use the information we collect or receive:
                </p>

                <ul class="text-sm text-slate-600">
                    <li>
                        1. To facilitate account creation and logon process.
                    </li>
                    <li>
                        2. To generate and provide personalized Google Meet
                        links.
                    </li>
                </ul>

                <h2 class="text-xl mt-8">
                    3. Will your information be shared with anyone?
                </h2>
                <p class="text-sm text-slate-600 my-4">
                    No, we will not share or distribute your personal
                    information with any third parties.
                </p>

                <h2 class="text-xl mt-8">
                    4. How long do we keep your information?
                </h2>
                <p class="text-sm text-slate-600 my-4">
                    We will only keep your personal information for as long as
                    it is necessary for the purposes set out in this privacy
                    policy, or required by law.
                </p>

                <h2 class="text-xl mt-8">
                    5. How do we keep your information safe?
                </h2>
                <p class="text-sm text-slate-600 my-4">
                    We have implemented appropriate technical and organizational
                    security measures designed to protect the security of any
                    personal information we process. However, despite our
                    safeguards and efforts to secure your information, no
                    electronic transmission over the Internet or information
                    storage technology can be guaranteed to be 100% secure.
                </p>

                <h2 class="text-xl mt-8">
                    6. Do we collect information from minors?
                </h2>
                <p class="text-sm text-slate-600 my-4">
                    We do not knowingly solicit data from or market to children
                    under 18 years of age.
                </p>

                <h2 class="text-xl mt-8">7. Contact us</h2>
                <p class="text-sm text-slate-600 my-4">
                    If you have questions or comments about this policy, email
                    us at contact@jrd.ms.
                </p>
            </div>
        </Layout>
    );

import { FC } from "hono/jsx";
import IconButton from "./IconButton";
import Plus from "../Icon/Plus";
import Text from "../Icon/Text";
import Smiley from "../Icon/Smiley";
import At from "../Icon/At";

const Chat: FC = () => (
    <a
        class="relative block group rounded-md border border-slate-300 cursor-pointer transition"
        href="#"
    >
        <div class="px-3.5 pt-2.5 pb-1.5">
            <p class="text-sm">/meet</p>
        </div>

        <div class="flex items-center justify-start gap-0.5 pt-1 pb-2 px-3 text-slate-400 group-hover:text-slate-500 transition">
            <IconButton active>
                <Plus />
            </IconButton>

            <IconButton>
                <Text />
            </IconButton>

            <IconButton>
                <Smiley />
            </IconButton>

            <IconButton>
                <At />
            </IconButton>
        </div>

        <div class="opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition absolute block -inset-x-px -top-14 bg-white rounded-md shadow py-1 border border-slate-400 text-sm">
            <div class="hover:bg-blue-500 text-black hover:text-white px-4 py-1">
                <p class="font-medium">/meet</p>
                <p class="text-xs opacity-60">Click to add to Slack!</p>
            </div>
        </div>
    </a>
);

export default Chat;

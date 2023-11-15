import { FC } from "hono/jsx";

const Link: FC<{ href: string; target?: "_blank" }> = ({
    children,
    href,
    target,
}) => (
    <a
        class="text-slate-400 hover:text-slate-500 transition"
        href={href}
        target={target}
    >
        {children}
    </a>
);

export default Link;

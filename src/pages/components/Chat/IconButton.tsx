import { FC } from "hono/jsx";

const IconButton: FC<{ active?: boolean }> = ({ children, active }) => (
    <button
        class={`${
            active ? "rounded-full bg-slate-100 mr-1" : ""
        } p-0.5 flex items-center justify-around`}
    >
        {children}
    </button>
);

export default IconButton;

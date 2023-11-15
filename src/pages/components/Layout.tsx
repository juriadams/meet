import { FC } from "hono/jsx";

export const Layout: FC = ({ children }) => (
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <script src="https://cdn.tailwindcss.com" />
        </head>

        <body class="flex items-center justify-around">{children}</body>
    </html>
);

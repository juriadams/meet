import { Context } from "hono";
import { AccessToken } from "../types/auth";
import { Bindings } from "../types/worker";

/**
 * Exchange the OAuth2 code for an access token.
 *
 * @param c Request context.
 * @param code Code received from the OAuth2 callback.
 *
 * @returns Promise resolving to the access token.
 */
export const exchangeToken = async (
    c: Context<{ Bindings: Bindings }>,
    code: string
): Promise<AccessToken> =>
    fetch(`https://oauth2.googleapis.com/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            code,
            client_id: c.env.GCP_CLIENT_ID,
            client_secret: c.env.GCP_CLIENT_SECRET,
            redirect_uri: c.env.REDIRECT_URI,
            grant_type: "authorization_code",
        }),
    }).then((res) => res.json() as unknown as AccessToken);

/**
 * Get a fresh access token from its associated refresh token.
 *
 * @param c Request context.
 * @param refreshToken Refresh token to use.
 *
 * @returns Promise resolving to the access token.
 */
export const refreshToken = async (
    c: Context<{ Bindings: Bindings }>,
    refreshToken: string
): Promise<AccessToken> =>
    fetch(`https://oauth2.googleapis.com/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            refresh_token: refreshToken,
            client_id: c.env.GCP_CLIENT_ID,
            client_secret: c.env.GCP_CLIENT_SECRET,
            grant_type: "refresh_token",
        }),
    }).then((res) => res.json() as unknown as AccessToken);

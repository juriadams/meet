export interface AccessToken {
    access_token: string;
    refresh_token: string;
    id_token: string;
    expires_in: number;
    scope: string;
    token_type: "Bearer";
}

export interface OAuthUser {
    iss: "https://accounts.google.com";
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number;
    exp: number;
}

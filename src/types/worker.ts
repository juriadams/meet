export type Bindings = {
    /** The client ID of the GCP OAuth application. */
    GCP_CLIENT_ID: string;

    /** The client secret of the GCP OAuth application. */
    GCP_CLIENT_SECRET: string;

    /** The redirect URI to which the user will be redirected after conensting. */
    REDIRECT_URI: string;

    /** The URL under which the database is reachable. */
    DB_URL: string;

    /** The token used to authenticate against the database. */
    DB_TOKEN: string;
};

# Meet

A straightforward Slack app and web service to create personalized Google Meet links.

## Quick Start

Follow the steps below to generate your Google Meet links:

### 1. Sign In

Start by navigating to the sign-in page at [`/auth/sign-in`](https://meet.jrd.ms/auth/sign-in) and logging in using your Google account.

### 2. Obtain API Key

After you've signed in, an API key will be displayed. Copy this key to use in Step 3.

### 3. Create Meeting Link

To generate your Google Meet link, make a `POST` request to [`/meet/create`](https://meet.jrd.ms/meet/create) with the API key included:

```
curl -X POST https://meet.jrd.ms/meet/create \
     -H 'Authorization: Bearer <API KEY>'
```

Upon successful execution, the service will return a response in the following format:

```json
{
    "host": "juri@adams.sh",
    "url": "https://meet.google.com/szq-nhnj-krt"
}
```

This response includes the hosting account and the unique URL for your Google Meet.

## Credits

This project is powered by the following tools and libraries:

-   ⚡️ [hono](https://github.com/honojs/hono) — A flexible framework for creating scalable serverless applications.
-   ⛅ [Cloudflare Workers](https://workers.cloudflare.com) — A high-speed edge runtime ensuring seamless experience.
-   🚀 [Turso](https://turso.tech) — An edge database optimized for high-performance data retrieval.
-   ✨ [drizzle](https://orm.drizzle.team) — A powerful ORM simplifying complicated database operations.

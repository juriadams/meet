# Meet

A straightforward web service to create personalized Google Meet links.

## Quick Start

Follow the steps below to generate your Google Meet links:

### 1. Sign In

Start by navigating to the sign-in page at [`/auth/sign-in`](https://meet.jrdms.workers.dev) and logging in using your Google account.

### 2. Obtain API Key

After you've signed in, an API key will be displayed. Copy this key to use in Step 3.

### 3. Create Meeting Link

To generate your Google Meet link, make a `POST` request to [`/meet/create`](https://meet.jrdms.workers.dev/meet/create) with the API key included:

```
curl -X POST https://meet.jrdms.workers.dev/meet/create \
     -H 'Authorization: Bearer <API KEY>'
```

Upon successful execution, the service will return a response in the following format:

```json
{
    "host": "juri@adams.sh",
    "url": "https://meet.google.com/f930-4862-a0df"
}
```

This response includes the hosting account and the unique URL for your Google Meet.

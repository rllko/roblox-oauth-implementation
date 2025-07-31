# Roblox OAuth with Next.js and Iron Session

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), extended to include OAuth authentication using **Roblox** as the provider and **`iron-session`** for secure session management.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Configuration

create a .env file with the following content:

```
AUTH_SECRET="" # use "openssl rand -base64 32"
AUTH_URL=https://apis.roblox.com/oauth/v1/
ROBLOX_ID=
ROBLOX_SECRET=
ROBLOX_REDIRECT=http://localhost:3000/api/auth/callback
NODE_ENV=development
```

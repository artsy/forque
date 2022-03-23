# Admin tool for de-deduping artists

This experiment from Hackathon 2022 provides an alternative for handling specialized one-off admin functionality.

This app currently houses one such specialized tool: a fresh take on **artist de-duping**.

The app provides the following stack:

- **Next.js** project for handling SSR, server- and client-side-routing, api endpoints etc
- **Gravity** authentication, including 2FA
- **SWR** data fetching hooks for **Gravity and Metaphysics**
- **Storybook** for visual component development
- **Jest** and **React Testing Library** for unit tests
- **Cypress** for end-to-end tests
- **Tailwind** for styling
- **Palette tokens** for use with Tailwind: typography, color, space, breakpoints.
- DevX: Typescript, ESLint, Prettier, lint-staged, commitlint


## Setup

Defaults are in `.env.development`. Download sensitive overrides from S3 via:

```
aws s3 cp s3://artsy-citadel/dev/.env.forque .env.local
```

(Personal overrides can be provided in a `.env.development.local` file.)

Install dependencies:

```
yarn install
```

And start a development server on http://localhost:3000:

```
yarn dev
```

## To Do

* Streamline setup with a script following other projects' patterns

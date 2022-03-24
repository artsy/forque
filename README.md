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

Install dependencies and setup config values:

```
./scripts/setup.sh
yarn dev
```

Visit your local development server at http://localhost:3000

## Configuration

Defaults are in `.env.development`. Sensitive overrides are copied from S3 to `.env.local`. Personal overrides can be provided in a `.env.development.local` file.


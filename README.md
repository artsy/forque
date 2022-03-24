# Forque

A home for admin apps

## Meta

- **State:** development
- **Staging:** [https://forque.stg.artsy.systems](https://forque.stg.artsy.systems)
  - [Kubernetes](https://kubernetes.stg.artsy.systems/#/search?q=force&namespace=default)
- **Production:** [https://forque.prd.artsy.systems](https://forque.prd.artsy.systems)
  - [Kubernetes](https://kubernetes.prd.artsy.systems/#/search?q=force&namespace=default)
- **GitHub:** [https://github.com/artsy/forque](https://github.com/artsy/forque)
- **Deployment:**
  - PRs from feature branches → main will automatically deploy to staging
  - PRs from staging → release will automatically deploy to production. ([Start a deploy...](https://github.com/artsy/forque/compare/release...staging?expand=1))
- **Point People:** TBD

## Setup

Visit your local development server at http://localhost:3000

## Configuration

## Setup

Clone the repo:

```sh
git clone git@github.com:artsy/forque.git
cd forque
```

Install dependencies and setup config values:

```
./scripts/setup.sh
```

Defaults are in `.env.development`. Sensitive overrides are copied from S3 to `.env.local`. Personal overrides can be provided in a `.env.development.local` file.

Run unit tests:

```
yarn test
```

Start a development server:

```
yarn dev
```

Start Storybook:

```
yarn storybook
```

## Troubleshooting

If you get a `Only absolute URLs are supported` upon login this may mean that you don't have a properly configured env file. Be sure to follow the setup steps above.

If you get a `Unauthorized: invalid client_id` upon login this may mean that you haven't configured the correct app id and app secret in your env file. The appropriate ClientApplication credentials can be found in Gravity.

## About

Forque originally began as a Hackathon project in January 2022. It aims to
provide a typical Artsy frontend stack for creating modern admin UIs.

It is built on the [Next.js](https://nextjs.org) framework.

# Forque

A home for admin apps

## Meta

- **State:** development
- **Staging:** [https://forque.stg.artsy.systems](https://forque.stg.artsy.systems)
  - [Kubernetes](https://kubernetes.stg.artsy.systems/#/search?q=forque&namespace=default)
- **Production:** [https://forque.prd.artsy.systems](https://forque.prd.artsy.systems)
  - [Kubernetes](https://kubernetes.prd.artsy.systems/#/search?q=forque&namespace=default)
- **GitHub:** [https://github.com/artsy/forque](https://github.com/artsy/forque)
- **Deployment:**
  - PRs from feature branches → main will automatically deploy to staging
  - PRs from staging → release will automatically deploy to production. ([Start a deploy...](https://github.com/artsy/forque/compare/release...staging?expand=1))
- **Point People:** TBD

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

Start a development server, and visit it at http://localhost:3000

```
yarn dev
```

Start Storybook:

```
yarn storybook
```

Run Relay:

```
yarn relay --watch
```

## Troubleshooting

- If you get a `Only absolute URLs are supported` upon login this may mean that you don't have a properly configured env file. Be sure to follow the setup steps above.

- If you get a `Unauthorized: invalid client_id` upon login this may mean that you haven't configured the correct app id and app secret in your env file. The appropriate ClientApplication credentials can be found in Gravity.

- If you've created a new page under `/pages` but don't see it appear in the browser, you're missing the `.page.tsx` prefix in the file name. See [here](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions#including-non-page-files-in-the-pages-directory) and [here](https://github.com/artsy/forque/blob/6117beeeb96ea081eeb78a2a5c6d8f0a8c4ed6fd/next.config.js#L12) for more info.

- If you're trying to refetch data with Relay and its not working, have you:

1. Wrapped the part of the React tree with a suspense component?

```tsx
<Suspense fallback={<div>loading</div>}>
```

2. Wrapped your click handler which triggered the refetch in `startTransition` helper?

```tsx
const handleClick = () => {
  startTransition(() => {
    refetch({ ... })
  })
}
```

We're using React 18 now, so all of the new [concurrency features](https://17.reactjs.org/docs/concurrent-mode-patterns.html) now apply.

## About

Forque originally began as a Hackathon project in January 2022. It aims to
provide a typical Artsy frontend stack for creating modern admin UIs.

It is built on the [Next.js](https://nextjs.org) framework.

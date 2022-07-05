/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require("@sentry/nextjs")

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    relay: {
      src: "./src",
      artifactDirectory: "./src/__generated__",
      language: "typescript",
    },

    styledComponents: true,
  },
  pageExtensions: ["page.tsx", "page.ts"],
  publicRuntimeConfig: {
    NEXT_PUBLIC_FILES_ENDPOINT_URL: process.env.NEXT_PUBLIC_FILES_ENDPOINT_URL,
    NEXT_PUBLIC_GRAVITY_URL: process.env.NEXT_PUBLIC_GRAVITY_URL,
    NEXT_PUBLIC_METAPHYSICS_URL: process.env.NEXT_PUBLIC_METAPHYSICS_URL,
    NEXT_PUBLIC_FORCE_URL: process.env.NEXT_PUBLIC_FORCE_URL,
  },
  reactStrictMode: true,
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  images: {
    domains: ["d32dm0rphc51dk.cloudfront.net", "d2v80f5yrouhh2.cloudfront.net"],
  },
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig)

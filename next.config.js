/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs');

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
  },
  reactStrictMode: true
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  // necessary to use authenticat sentry-cli
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);

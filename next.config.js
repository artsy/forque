/** @type {import('next').NextConfig} */
module.exports = {
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
    NEXT_PUBLIC_GRAVITY_URL: process.env.NEXT_PUBLIC_GRAVITY_URL,
    NEXT_PUBLIC_METAPHYSICS_URL: process.env.NEXT_PUBLIC_METAPHYSICS_URL,
  },
  reactStrictMode: true,
}

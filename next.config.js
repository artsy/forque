/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_GRAVITY_URL: process.env.NEXT_PUBLIC_GRAVITY_URL,
    NEXT_PUBLIC_METAPHYSICS_URL: process.env.NEXT_PUBLIC_METAPHYSICS_URL,
  },
  compiler: {
    styledComponents: true
  },
  pageExtensions: ['page.tsx', 'page.ts'],
  reactStrictMode: true,
}

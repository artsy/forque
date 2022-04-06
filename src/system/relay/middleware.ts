import getConfig from "next/config"
import {
  cacheMiddleware,
  Headers,
  loggerMiddleware,
  Middleware,
  urlMiddleware,
} from "react-relay-network-modern"

const { publicRuntimeConfig } = getConfig()

export const getRelayMiddleware = (user?: unknown | null): Middleware[] => {
  const authenticatedHeaders: Headers = user
    ? {
        // @ts-ignore
        "X-USER-ID": user.id,
        // @ts-ignore
        "X-ACCESS-TOKEN": user.accessToken,
      }
    : {}

  return [
    urlMiddleware({
      url: publicRuntimeConfig.NEXT_PUBLIC_METAPHYSICS_URL! + "/v2",
      headers: authenticatedHeaders,
    }),
    loggerMiddleware({
      logger: (...args: any) =>
        typeof window !== "undefined" ? console.log(...args) : undefined,
    }),
    cacheMiddleware({
      size: 100,
      ttl: 60 * 1000,
    }),
  ]
}

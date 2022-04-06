import { User } from "next-auth"
import getConfig from "next/config"
import {
  cacheMiddleware,
  Headers,
  loggerMiddleware,
  Middleware,
  urlMiddleware,
} from "react-relay-network-modern"

const { publicRuntimeConfig } = getConfig()

export const getRelayMiddleware = (user?: User | null): Middleware[] => {
  const authenticatedHeaders: Headers = user
    ? {
        "X-USER-ID": user.id,
        "X-ACCESS-TOKEN": user.accessToken as string,
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

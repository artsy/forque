import getConfig from "next/config"
import {
  cacheMiddleware,
  errorMiddleware,
  Headers,
  loggerMiddleware,
  Middleware,
  urlMiddleware,
} from "react-relay-network-modern"
import type { UserWithAccessToken } from "system"

const { publicRuntimeConfig } = getConfig()

const enableLogging =
  process.env.NODE_ENV === "development" && typeof window !== "undefined"

export const getRelayMiddleware = (
  user?: UserWithAccessToken
): Middleware[] => {
  const authenticatedHeaders: Headers = user
    ? {
        "X-USER-ID": user.id,
        "X-ACCESS-TOKEN": user.accessToken,
      }
    : {}

  const middleware = [
    urlMiddleware({
      url: publicRuntimeConfig.NEXT_PUBLIC_METAPHYSICS_URL! + "/v2",
      headers: authenticatedHeaders,
    }),
    enableLogging && loggerMiddleware(),
    enableLogging && errorMiddleware({ disableServerMiddlewareTip: true }),
    cacheMiddleware({
      size: 100,
      ttl: 60 * 1000,
    }),
  ] as Middleware[]

  return middleware
}

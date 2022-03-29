import getConfig from "next/config"
import {
  cacheMiddleware,
  Headers,
  loggerMiddleware,
  Middleware,
  urlMiddleware,
} from "react-relay-network-modern"
import { UserSessionData } from "system/artsy-next-auth/auth/user"

const { publicRuntimeConfig } = getConfig()

export const getRelayMiddleware = (
  user?: UserSessionData | null
): Middleware[] => {
  const authenticatedHeaders: Headers = user
    ? {
        "X-USER-ID": user.id,
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

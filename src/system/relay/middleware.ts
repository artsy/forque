import getConfig from "next/config"
import {
  cacheMiddleware,
  loggerMiddleware,
  urlMiddleware,
} from "react-relay-network-modern"

const { publicRuntimeConfig } = getConfig()
const isClient = typeof window !== "undefined"

export const middleware: Array<any> = [
  urlMiddleware({
    url: publicRuntimeConfig.NEXT_PUBLIC_METAPHYSICS_URL! + "/v2",
  }),
  isClient && loggerMiddleware(),
  cacheMiddleware({
    size: 100,
    ttl: 60 * 1000,
  }),
]

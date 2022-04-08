import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"
import {
  CacheConfig,
  fetchQuery,
  FetchQueryFetchPolicy,
  GraphQLTaggedNode,
  OperationType,
} from "relay-runtime"
import type { UserWithAccessToken } from "system"
import { setupEnvironment } from "system/relay/setupEnvironment"

interface FetchRelayDataProps<T extends OperationType> {
  query: GraphQLTaggedNode
  variables?: T["variables"]
  cache?: boolean
  cacheConfig?: {
    networkCacheConfig?: CacheConfig | null | undefined
    fetchPolicy?: FetchQueryFetchPolicy | null | undefined
  } | null
  ctx: GetServerSidePropsContext
}

export async function fetchRelayData<T extends OperationType>({
  query,
  variables = {},
  cacheConfig = {},
  cache = false,
  ctx,
}: FetchRelayDataProps<T>) {
  const session = await getSession(ctx)
  const user = session?.user as UserWithAccessToken

  const environment = setupEnvironment({ user })

  if (cache) {
    cacheConfig = {
      fetchPolicy: "store-or-network",
      networkCacheConfig: {
        force: false,
      },
    }
  }

  const queryProps = (await fetchQuery(
    environment,
    query,
    variables,
    cacheConfig
  ).toPromise()) as object

  const relayData = environment.getStore().getSource().toJSON()

  return {
    ...queryProps,
    relayData,
  }
}

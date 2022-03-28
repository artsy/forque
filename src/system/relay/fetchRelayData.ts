import {
  CacheConfig,
  fetchQuery,
  FetchQueryFetchPolicy,
  GraphQLTaggedNode,
  OperationType,
} from "relay-runtime"
import { setupEnvironment } from "system/relay/setupEnvironment"

interface FetchRelayDataProps<T extends OperationType> {
  query: GraphQLTaggedNode
  variables?: T["variables"]
  cache?: boolean
  cacheConfig?: {
    networkCacheConfig?: CacheConfig | null | undefined
    fetchPolicy?: FetchQueryFetchPolicy | null | undefined
  } | null
}

export async function fetchRelayData<T extends OperationType>({
  query,
  variables = {},
  cacheConfig = {},
  cache = false,
}: FetchRelayDataProps<T>) {
  const environment = setupEnvironment()

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

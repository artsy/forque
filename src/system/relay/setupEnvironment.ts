import { useMemo } from "react"
import { RelayNetworkLayer } from "react-relay-network-modern"
import { Environment, RecordSource, Store } from "relay-runtime"
import { UserWithAccessToken } from "system/artsy-next-auth"
import { getRelayMiddleware } from "./middleware"

let relayEnvironment: Environment

interface SetupEnvironmentProps {
  initialRecords?: any
  user?: UserWithAccessToken
}

export function setupEnvironment({
  initialRecords,
  user,
}: SetupEnvironmentProps = {}) {
  const environment = relayEnvironment ?? createEnvironment(user)

  if (initialRecords) {
    environment.getStore().publish(new RecordSource(initialRecords))
  }
  if (typeof window === "undefined") {
    return environment
  }
  if (!relayEnvironment) {
    relayEnvironment = environment
  }

  return relayEnvironment
}

function createEnvironment(user?: UserWithAccessToken) {
  return new Environment({
    network: new RelayNetworkLayer(getRelayMiddleware(user)),
    store: new Store(new RecordSource()),
  })
}

export function useEnvironment({
  initialRecords,
  user,
}: SetupEnvironmentProps = {}) {
  const store = useMemo(() => {
    return setupEnvironment({ initialRecords, user })
  }, [initialRecords, user]) as Environment
  return store
}

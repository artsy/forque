import { useMemo } from "react"
import { RelayNetworkLayer } from "react-relay-network-modern"
import { Environment, RecordSource, Store } from "relay-runtime"
import { UserSessionData } from "system/artsy-next-auth/auth/user"
import { getRelayMiddleware } from "./middleware"

let relayEnvironment: Environment

interface SetupEnvironmentProps {
  initialRecords?: any
  user?: UserSessionData | null
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

function createEnvironment(user?: UserSessionData | null) {
  return new Environment({
    network: new RelayNetworkLayer(getRelayMiddleware(user)),
    store: new Store(new RecordSource()),
  })
}

export function useEnvironment({
  initialRecords,
  user,
}: SetupEnvironmentProps) {
  const store = useMemo(
    () => setupEnvironment({ initialRecords, user }),
    [initialRecords, user]
  )
  return store
}

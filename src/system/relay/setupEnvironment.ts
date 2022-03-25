import { useMemo } from "react"
import { RelayNetworkLayer } from "react-relay-network-modern"
import { Environment, RecordSource, Store } from "relay-runtime"
import { middleware } from "./middleware"

let relayEnvironment: Environment

export function setupEnvironment(initialRecords?: any) {
  const environment = relayEnvironment ?? createEnvironment()

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

function createEnvironment() {
  return new Environment({
    network: new RelayNetworkLayer(middleware),
    store: new Store(new RecordSource()),
  })
}

export function useEnvironment(initialRecords?: any) {
  const store = useMemo(
    () => setupEnvironment(initialRecords),
    [initialRecords]
  )
  return store
}

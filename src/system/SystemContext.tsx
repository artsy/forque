import { createContext } from "react"
import { Environment } from "relay-runtime"
import { UserWithAccessToken } from "./artsy-next-auth"

interface SystemContextProps {
  relayEnvironment: Environment
  user: UserWithAccessToken | null
}

export const SystemContext = createContext<SystemContextProps>({
  relayEnvironment: null,
  user: null,
} as unknown as SystemContextProps)

export const SystemContextProvider: React.FC<SystemContextProps> = ({
  children,
  ...contextValues
}) => {
  return (
    <SystemContext.Provider value={contextValues}>
      {children}
    </SystemContext.Provider>
  )
}

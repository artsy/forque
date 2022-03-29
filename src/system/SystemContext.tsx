import { createContext } from "react"
import { Environment } from "relay-runtime"
import { UserSessionData } from "./artsy-next-auth/auth/user"

interface SystemContextProps {
  relayEnvironment: Environment
  user: UserSessionData | null
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

import { createContext, useContext } from "react"
import { Environment } from "relay-runtime"
import { UserSessionData } from "./artsy-next-auth/auth/user"

interface SystemContextProps {
  relayEnvironment: Environment
  user: UserSessionData | null
}

const SystemContext = createContext<SystemContextProps>({
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

export const useSystemContext = () => {
  const systemContext = useContext(SystemContext)
  return systemContext
}

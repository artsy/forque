import { useContext } from "react"
import { SystemContext } from "system/SystemContext"

export const useSystemContext = () => {
  const systemContext = useContext(SystemContext)
  return systemContext
}

import { useUser } from "lib/artsy-next-auth"
import { GlobalNav } from "./GlobalNav"

export const GlobalNavContainer: React.FC = () => {
  const user = useUser()
  return <GlobalNav user={user} />
}

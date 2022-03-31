import { GlobalNav } from "./GlobalNav"
import { UserSessionData } from "system/artsy-next-auth/auth/user"

interface LayoutProps {
  user: UserSessionData
}

export const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  return (
    <>
      <header>
        <GlobalNav user={{email: "joey@example.com"}} />
      </header>
      <main className="container mx-auto p-2 sm:py-4">{children}</main>
    </>
  )
}

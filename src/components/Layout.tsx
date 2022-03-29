import { GlobalNav } from "./GlobalNav"
import { LoginForm } from "system/artsy-next-auth"
import { UserSessionData } from "system/artsy-next-auth/auth/user"

interface LayoutProps {
  user: UserSessionData
}

export const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  return (
    <>
      {user ? (
        <>
          <header>
            <GlobalNav user={user} />
          </header>
          <main className="container mx-auto p-2 sm:py-4">{children}</main>
        </>
      ) : (
        <LoginForm />
      )}
    </>
  )
}

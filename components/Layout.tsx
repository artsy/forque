import { useUser } from "../lib/artsy-next-auth"
import { GlobalNav } from "./GlobalNav"

import { LoginForm } from "../lib/artsy-next-auth"

export const Layout: React.FC = ({ children }) => {
  const user = useUser()

  return user ? (
    <>
      <header>
        <GlobalNav user={user} />
      </header>
      <main className="container mx-auto py-6 w-6/12">{children}</main>
    </>
  ) : (
    <LoginForm />
  )
}

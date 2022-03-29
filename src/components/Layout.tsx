import { useUser } from "system/artsy-next-auth"
import { GlobalNav } from "./GlobalNav"

import { LoginForm } from "system/artsy-next-auth"

export const Layout: React.FC = ({ children }) => {
  const user = useUser()

  return user ? (
    <>
      <header>
        <GlobalNav user={user} />
      </header>
      <main className="container mx-auto p-2 sm:py-4">{children}</main>
    </>
  ) : (
    <LoginForm />
  )
}

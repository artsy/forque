import { GlobalNav } from "./GlobalNav"
import { Box, Toasts } from "@artsy/palette"
import { signIn } from "next-auth/react"
import { User } from "next-auth"

interface LayoutProps {
  user: User
}

export const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  return user ? (
    <AuthorizedLayout user={user}>{children}</AuthorizedLayout>
  ) : (
    <UnauthorizedLayout />
  )
}

const AuthorizedLayout: React.FC<{ user: User }> = ({ children, user }) => {
  return (
    <>
      <header>
        <GlobalNav user={user} />
      </header>

      <main className="container mx-auto p-2 sm:py-4">
        {children}

        <Box position="fixed" zIndex={10} bottom={1} right={1} width={400}>
          <Toasts />
        </Box>
      </main>
    </>
  )
}

const UnauthorizedLayout: React.FC = () => {
  return (
    <>
      <header>
        <GlobalNav />
      </header>

      <main className="container mx-auto p-2 sm:py-4">
        <a onClick={() => signIn()}>Please log in</a>
      </main>
    </>
  )
}

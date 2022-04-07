import { GlobalNav } from "./GlobalNav"
import { Box, Button, Toasts } from "@artsy/palette"
import { signIn } from "next-auth/react"
import type { UserWithAccessToken } from "system/artsy-next-auth"

interface LayoutProps {
  user: UserWithAccessToken
}

export const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  return user ? (
    <AuthorizedLayout user={user}>{children}</AuthorizedLayout>
  ) : (
    <UnauthorizedLayout />
  )
}

const AuthorizedLayout: React.FC<{ user: UserWithAccessToken }> = ({
  children,
  user,
}) => {
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

      <main className="container mx-auto p-2 sm:py-4 text-center">
        <Button onClick={() => signIn("artsy")}>Please log in</Button>
      </main>
    </>
  )
}

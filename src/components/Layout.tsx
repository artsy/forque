import { GlobalNav } from "./GlobalNav"
import { Box, Toasts } from "@artsy/palette"

interface LayoutProps {
  user: unknown
}

export const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  return (
    <>
      {user && (
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
      )}
    </>
  )
}

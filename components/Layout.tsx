import { GlobalNavContainer } from "./GlobalNavContainer"

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <header>
        <GlobalNavContainer />
      </header>
      <main className="container mx-auto py-6 w-6/12">{children}</main>
    </>
  )
}

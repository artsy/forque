import "../styles/globals.css"
import "regenerator-runtime" // relay network requirement
import App from "next/app"
import type { AppContext, AppProps } from "next/app"
import { Theme, injectGlobalStyles, Box, Text } from "@artsy/palette"
import { Layout } from "components/Layout"
import { ErrorBoundary } from "system/ErrorBoundary"
import { useEnvironment } from "system/relay/setupEnvironment"
import { RelayEnvironmentProvider } from "react-relay"
import { getUserFromCookie } from "system/artsy-next-auth/auth/user"
import { GetServerSideProps, NextApiRequest } from "next"
import { SystemContextProvider } from "system/SystemContext"
import { RouteLoadingBar } from "system/RouteLoadingBar"
import { SessionProvider, getSession } from "next-auth/react"

const { GlobalStyles } = injectGlobalStyles(`
  /* overrides and additions */
`)

export default function MyApp({ Component, pageProps }: AppProps) {
  const environment = useEnvironment({
    initialRecords: pageProps.relayData,
    user: pageProps.systemUser,
  })

  return (
    <SystemContextProvider
      relayEnvironment={environment}
      user={pageProps.systemUser}
    >
      <RelayEnvironmentProvider environment={environment!}>
        <SessionProvider session={pageProps.session}>
          <Theme theme="v3">
            <GlobalStyles />
            <ErrorBoundary>
              <Layout user={pageProps.systemUser}>
                <RouteLoadingBar />
                <Component {...pageProps} />
              </Layout>
            </ErrorBoundary>
          </Theme>
        </SessionProvider>
      </RelayEnvironmentProvider>
    </SystemContextProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const session = await getSession(appContext.ctx)
  console.log("MyApp.getInitialProps", session)
  const appProps = await App.getInitialProps(appContext)
  // const systemUser = await getUserFromCookie(
  //   appContext.ctx.req as NextApiRequest
  // )
  // appProps.pageProps.systemUser = systemUser
  appProps.pageProps.session = session
  appProps.pageProps.systemUser = session?.user
  return appProps
}

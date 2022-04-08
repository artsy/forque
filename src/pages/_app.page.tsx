import "../styles/globals.css"
import "regenerator-runtime" // relay network requirement
import App from "next/app"
import type { AppContext, AppProps } from "next/app"
import { Theme, injectGlobalStyles, ToastsProvider } from "@artsy/palette"
import { Layout } from "components/Layout"
import { ErrorBoundary } from "system/ErrorBoundary"
import { useEnvironment } from "system/relay/setupEnvironment"
import { RelayEnvironmentProvider } from "react-relay"
import { RouteLoadingBar } from "system/RouteLoadingBar"
import { getSession, SessionProvider } from "next-auth/react"
import { Suspense } from "react"

const { GlobalStyles } = injectGlobalStyles(`
  /* overrides and additions */
`)

export default function MyApp({ Component, pageProps }: AppProps) {
  const environment = useEnvironment({
    initialRecords: pageProps.relayData,
    user: pageProps.session?.user,
  })

  return (
    <SessionProvider session={pageProps.session}>
      <RelayEnvironmentProvider environment={environment!}>
        <Theme theme="v3">
          <ToastsProvider>
            <GlobalStyles />
            <Layout user={pageProps.session?.user}>
              <RouteLoadingBar />
              <ErrorBoundary>
                <Suspense fallback={null}>
                  <Component {...pageProps} />
                </Suspense>
              </ErrorBoundary>
            </Layout>
          </ToastsProvider>
        </Theme>
      </RelayEnvironmentProvider>
    </SessionProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const session = await getSession(appContext.ctx)
  const appProps = await App.getInitialProps(appContext)
  appProps.pageProps.session = session
  return appProps
}

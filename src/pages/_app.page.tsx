import "../styles/globals.css"
import "regenerator-runtime" // relay network requirement
import App from "next/app"
import type { AppContext, AppProps } from "next/app"
import { Theme, injectGlobalStyles, ToastsProvider } from "@artsy/palette"
import { Layout } from "components/Layout"
import { ErrorBoundary } from "system/ErrorBoundary"
import { useEnvironment } from "system/relay/setupEnvironment"
import { RelayEnvironmentProvider } from "react-relay"
import { SystemContextProvider } from "system/SystemContext"
import { RouteLoadingBar } from "system/RouteLoadingBar"

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
        <Theme theme="v3">
          <ToastsProvider>
            <GlobalStyles />
            <ErrorBoundary>
              <Layout user={pageProps.systemUser}>
                <RouteLoadingBar />
                <Component {...pageProps} />
              </Layout>
            </ErrorBoundary>
          </ToastsProvider>
        </Theme>
      </RelayEnvironmentProvider>
    </SystemContextProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const systemUser = {
    email: "test@example.com",
    accessToken: "omglmfao",
  }
  appProps.pageProps.systemUser = systemUser
  return appProps
}

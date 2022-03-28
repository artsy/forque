import "../styles/globals.css"
import "regenerator-runtime" // relay network requirement
import type { AppProps } from "next/app"
import { Theme, injectGlobalStyles } from "@artsy/palette"
import { Layout } from "components/Layout"
import { ErrorBoundary } from "system/ErrorBoundary"
import { useEnvironment } from "system/relay/setupEnvironment"
import { RelayEnvironmentProvider } from "react-relay"

const { GlobalStyles } = injectGlobalStyles(`
  /* overrides and additions */
`)

function MyApp({ Component, pageProps }: AppProps) {
  const environment = useEnvironment(pageProps.relayData)

  return (
    <Theme theme="v3">
      <RelayEnvironmentProvider environment={environment}>
        <GlobalStyles />
        <ErrorBoundary>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    </Theme>
  )
}

export default MyApp

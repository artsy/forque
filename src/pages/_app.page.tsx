import "../styles/globals.css"
import "regenerator-runtime" // relay network requirement
import App from "next/app"
import type { AppContext, AppProps } from "next/app"
import { Theme, injectGlobalStyles } from "@artsy/palette"
import { Layout } from "components/Layout"
import { ErrorBoundary } from "system/ErrorBoundary"
import { useEnvironment } from "system/relay/setupEnvironment"
import { RelayEnvironmentProvider } from "react-relay"
import { getUserFromCookie } from "system/artsy-next-auth/auth/user"
import { NextApiRequest } from "next"

const { GlobalStyles } = injectGlobalStyles(`
  /* overrides and additions */
`)

export default function MyApp({ Component, pageProps }: AppProps) {
  const environment = useEnvironment({
    initialRecords: pageProps.relayData,
    user: pageProps.user,
  })

  return (
    <Theme theme="v3">
      <RelayEnvironmentProvider environment={environment}>
        <GlobalStyles />
        <ErrorBoundary>
          <Layout user={pageProps.user}>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    </Theme>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const user = await getUserFromCookie(appContext.ctx.req as NextApiRequest)
  appProps.pageProps.user = user
  return { ...appProps }
}

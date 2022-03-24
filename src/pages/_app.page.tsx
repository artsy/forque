import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Theme, injectGlobalStyles } from "@artsy/palette"
import { Layout } from "components/Layout"

const { GlobalStyles } = injectGlobalStyles(`
  /* overrides and additions */
`)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme theme="v3">
      <>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    </Theme>
  )
}

export default MyApp

import { Tab, Tabs, Banner } from "@artsy/palette"
import { GetServerSideProps } from "next"
import { useSession } from "next-auth/react"
import getConfig from "next/config"
import Head from "next/head"
import { graphql } from "react-relay"
import { assertPermitted, UserWithAccessToken } from "system"
import { fetchRelayData } from "system/relay"
import { featureFlagsQuery$data } from "__generated__/featureFlagsQuery.graphql"
import CreateFeatureFlag from "./components/CreateFeatureFlag"
import FeatureFlagsTable from "./components/FeatureFlagsTable"

interface FeatureFlagPageProps {
  viewer: featureFlagsQuery$data["viewer"]
}

const FeatureFlagPage: React.FC<FeatureFlagPageProps> = (props) => {
  const { publicRuntimeConfig } = getConfig()
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  assertPermitted(user, "feature-flags")

  // HACK: Temporary guard to prevent actions on production until a better
  // solution is implemented.
  if (publicRuntimeConfig.NEXT_PUBLIC_METAPHYSICS_URL.includes("staging")) {
    return (
      <Banner variant="error">Feature Flags not available on staging</Banner>
    )
  }
  return (
    <>
      <Head>
        <title>Feature Flag Management</title>
      </Head>
      <Tabs>
        <Tab name="List">
          <FeatureFlagsTable viewer={props?.viewer!} />
        </Tab>
        <Tab name="Create">
          <CreateFeatureFlag />
        </Tab>
      </Tabs>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await fetchRelayData({
    query: graphql`
      query featureFlagsQuery {
        viewer {
          ...FeatureFlagsTable_featureFlag
        }
      }
    `,
    ctx,
  })

  return {
    props,
  }
}

export default FeatureFlagPage

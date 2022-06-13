import { Tab, Tabs } from "@artsy/palette"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { graphql } from "react-relay"
import { fetchRelayData } from "system/relay"
import { featureFlagsQuery$data } from "__generated__/featureFlagsQuery.graphql"
import CreateFeatureFlag from "./components/CreateFeatureFlag"
import FeatureFlagsTable from "./components/FeatureFlagsTable"

interface FeatureFlagPageProps {
  viewer: featureFlagsQuery$data["viewer"]
}

const FeatureFlagPage: React.FC<FeatureFlagPageProps> = (props) => {
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

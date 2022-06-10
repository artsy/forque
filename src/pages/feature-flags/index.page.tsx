import { Tab, Tabs } from "@artsy/palette"
import { Table } from "components/Table"
import { GetServerSideProps } from "next"
import { graphql } from "react-relay"
import { fetchRelayData } from "system/relay"
import { featureFlagsQuery$data } from "__generated__/featureFlagsQuery.graphql"
import CreateFeatureFlag from "./components/CreateFeatureFlag"
import EditFeatureFlag from "./components/EditFeatureFlag"

interface FeatureFlagPageProps {
  admin: featureFlagsQuery$data["admin"]
}

const FeatureFlagPage: React.FC<FeatureFlagPageProps> = (props) => {
  return (
    <Tabs>
      <Tab name="List">
        <Table
          columns={[
            {
              Header: "Name",
              accessor: "name",
            },
            {
              Header: "Enabled",
              accessor: "enabled",
            },
            {
              Header: "Created At",
              accessor: "createdAt",
            },
          ]}
          data={props.admin?.featureFlags as any}
          renderExpandedRow={(row) => {
            return <EditFeatureFlag row={row} />
          }}
          onRowClick={(row) => {
            row.toggleExpandRow()
          }}
        />
      </Tab>
      <Tab name="Create">
        <CreateFeatureFlag />
      </Tab>
    </Tabs>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await fetchRelayData({
    query: graphql`
      query featureFlagsQuery {
        admin {
          featureFlags {
            name
            enabled
            createdAt(format: "MMM DD, YYYY")
          }
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

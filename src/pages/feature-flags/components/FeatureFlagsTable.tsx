import { Flex, Checkbox, Box, Button } from "@artsy/palette"
import { Table } from "components/Table"
import { graphql, useRefetchableFragment } from "react-relay"
import { FeatureFlagsTable_featureFlag$key } from "__generated__/FeatureFlagsTable_featureFlag.graphql"
import { useDeleteFeatureFlag } from "../mutations/useDeleteFeatureFlag"
import { useToggleFeatureFlag } from "../mutations/useToggleFeatureFlag"
import FeatureFlagOverview from "./FeatureFlagOverview"
import { startTransition } from "react"

interface FeatureFlagsTableProps {
  viewer: FeatureFlagsTable_featureFlag$key
}

export const FeatureFlagFields = graphql`
  fragment FeatureFlagsTable on FeatureFlag {
    name
    stale
    enabled
    description
    impressionData
    type
    createdAt(format: "MMM DD, YYYY")
    environments {
      enabled
      name
    }
    variants {
      name
      stickiness
      weight
      weightType
    }
  }
`

const FeatureFlagTable: React.FC<FeatureFlagsTableProps> = ({ viewer }) => {
  const { submitMutation: toggleFeatureFlag } = useToggleFeatureFlag()
  const { submitMutation: deleteFeatureFlag } = useDeleteFeatureFlag()

  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment FeatureFlagsTable_featureFlag on Viewer
      @refetchable(queryName: "FeatureFlagsTableQuery") {
        admin {
          featureFlags {
            ...FeatureFlagsTable @relay(mask: false)
          }
        }
      }
    `,
    viewer
  )

  return (
    <>
      <Table
        columns={[
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Type",
            accessor: "type",
          },
          {
            Header: "Created At",
            accessor: "createdAt",
          },
          {
            Header: "Stale",
            accessor: "stale",
            Cell: (row: any) => {
              return <>{row.value.toString()}</>
            },
          },
          {
            Header: "Environments",
            accessor: "environments",
            Cell: ({ row }: any) => {
              return (
                <Flex>
                  {row.values.environments.map((env: any, key: number) => {
                    return (
                      <Checkbox
                        mx={1}
                        key={key}
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                        }}
                        onSelect={async (selected: boolean) => {
                          await toggleFeatureFlag({
                            variables: {
                              input: {
                                name: row.values.name,
                                environment: env.name.toUpperCase(),
                                enabled: selected,
                              },
                            },
                          })
                        }}
                        selected={env.enabled}
                      >
                        {env.name}
                      </Checkbox>
                    )
                  })}
                </Flex>
              )
            },
          },
          {
            Header: "Actions",
            Cell: ({ row }: any) => {
              return (
                <Box>
                  <Button
                    size="small"
                    variant="secondaryOutline"
                    onClick={async (event) => {
                      event.stopPropagation()
                      event.preventDefault()

                      await deleteFeatureFlag({
                        variables: {
                          input: {
                            name: row.values.name,
                          },
                        },
                      })

                      startTransition(() => {
                        refetch({}, { fetchPolicy: "network-only" })
                      })
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              )
            },
          },
        ]}
        data={data.admin?.featureFlags as any}
        renderExpandedRow={(row) => {
          return <FeatureFlagOverview row={row} my={1} />
        }}
        onRowClick={(row) => {
          row.toggleExpandRow()
        }}
      />
    </>
  )
}

export default FeatureFlagTable

import { Flex, Checkbox, Button, Text, useToasts } from "@artsy/palette"
import { Table } from "components/Table"
import { graphql, useRefetchableFragment } from "react-relay"
import { FeatureFlagsTable_featureFlag$key } from "__generated__/FeatureFlagsTable_featureFlag.graphql"
import { FeatureFlagsTable$data } from "__generated__/FeatureFlagsTable.graphql"
import { useDeleteFeatureFlag } from "../mutations/useDeleteFeatureFlag"
import { useToggleFeatureFlag } from "../mutations/useToggleFeatureFlag"
import FeatureFlagOverview from "./FeatureFlagOverview"
import { startTransition, useState } from "react"
import { AdminToggleFeatureFlagEnvironment } from "__generated__/useToggleFeatureFlagMutation.graphql"

interface FeatureFlagsTableProps {
  viewer: FeatureFlagsTable_featureFlag$key
}

interface FeatureFlagEnvironment {
  enabled: boolean
  name: string
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

  if (!data.admin) {
    return <Text variant="md">No feature flags available.</Text>
  }

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
            Cell: (row: { value: boolean }) => {
              return <>{row.value.toString()}</>
            },
          },
          {
            Header: "Environments",
            accessor: "environments",
            Cell: ({
              row: { values },
            }: {
              row: { values: FeatureFlagsTable$data }
            }) => {
              if (!values || !values.environments) return null

              return (
                <Flex>
                  {values.environments.map(
                    (env: FeatureFlagEnvironment | null, key: number) => {
                      if (!env) return null

                      return (
                        <ToggleEnvCheckbox
                          enabled={env.enabled}
                          key={key}
                          onSelect={async (selected: boolean) => {
                            await toggleFeatureFlag({
                              variables: {
                                input: {
                                  name: values.name,
                                  environment:
                                    env.name.toUpperCase() as AdminToggleFeatureFlagEnvironment,
                                  enabled: selected,
                                },
                              },
                            })
                          }}
                        >
                          {env.name}
                        </ToggleEnvCheckbox>
                      )
                    }
                  )}
                </Flex>
              )
            },
          },
          {
            Header: "Actions",
            Cell: ({
              row: { values },
            }: {
              row: { values: FeatureFlagsTable$data }
            }) => {
              return (
                <ArchiveButton
                  name={values.name}
                  onArchive={async () => {
                    await deleteFeatureFlag({
                      variables: {
                        input: {
                          name: values.name,
                        },
                      },
                    })

                    startTransition(() => {
                      refetch({}, { fetchPolicy: "network-only" })
                    })
                  }}
                />
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

const ToggleEnvCheckbox: React.FC<{
  enabled: boolean
  onSelect: (selected: boolean) => Promise<void>
}> = ({ children, enabled, onSelect }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Checkbox
      mx={1}
      style={{ opacity: isLoading ? 0.3 : 1 }}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      onSelect={async (selected: boolean) => {
        setIsLoading(true)
        await onSelect(selected)
      }}
      selected={enabled}
    >
      {isLoading ? (enabled ? "Disabling..." : "Enabling...") : children}
    </Checkbox>
  )
}

const ArchiveButton: React.FC<{
  name: string
  onArchive: () => Promise<void>
}> = ({ name, onArchive }) => {
  const { sendToast } = useToasts()
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)

  return (
    <Button
      size="small"
      variant="secondaryOutline"
      width={80}
      loading={isArchiving}
      onClick={async (event) => {
        event.stopPropagation()
        event.preventDefault()

        setShowConfirmMessage(true)

        if (showConfirmMessage) {
          setIsArchiving(true)
          await onArchive()

          sendToast({
            message: `Successfully archived ${name}`,
            variant: "alert",
          })
        }
      }}
    >
      {showConfirmMessage ? "OK?" : "Archive"}
    </Button>
  )
}

export default FeatureFlagTable

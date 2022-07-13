import { Flex, Checkbox, Button, Text, useToasts } from "@artsy/palette"
import { graphql, useRefetchableFragment } from "react-relay"
import {
  // FeatureFlagsTable_featureFlag$data,
  FeatureFlagsTable_featureFlag$key,
} from "__generated__/FeatureFlagsTable_featureFlag.graphql"
import { FeatureFlagsTable$data } from "__generated__/FeatureFlagsTable.graphql"
import { useDeleteFeatureFlag } from "../mutations/useDeleteFeatureFlag"
import { useToggleFeatureFlag } from "../mutations/useToggleFeatureFlag"
import FeatureFlagOverview from "./FeatureFlagOverview"
import { startTransition, useState } from "react"
import { AdminToggleFeatureFlagEnvironment } from "__generated__/useToggleFeatureFlagMutation.graphql"
import { Table2 } from "components/Table2"

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
      <Table2<FeatureFlagsTable$data>
        columns={[
          {
            header: "Name",
            accessor: "name",
          },
          {
            header: "Type",
            accessor: "type",
          },
          {
            header: "Created At",
            accessor: "createdAt",
          },
          {
            header: "Stale",
            accessor: "stale",
            Cell: ({ value }) => {
              return <>{value.toString()}</>
            },
          },
          {
            header: "Environments",
            accessor: "environments",
            Cell: ({ values }) => {
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
            header: "Actions",
            Cell: ({ values }) => {
              if (!values) {
                return null
              }

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
        data={data.admin?.featureFlags as FeatureFlagsTable$data[]}
        renderExpandedRow={({ values }) => {
          return <FeatureFlagOverview values={values} my={1} />
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

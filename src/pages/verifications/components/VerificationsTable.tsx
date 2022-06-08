import { Spacer, Text } from "@artsy/palette"
import { ListPagination } from "components/ListPagination"
import { Table } from "components/Table"
import { useExtractNodes } from "hooks"
import { Suspense } from "react"
import { graphql, useRefetchableFragment } from "react-relay"
import { VerificationsTable_viewer$key } from "__generated__/VerificationsTable_viewer.graphql"

interface VerificationsTableProps {
  viewer: VerificationsTable_viewer$key
}

export const VerificationsTable: React.FC<VerificationsTableProps> = ({
  viewer,
}) => {
  const [viewerData, refetch] = useRefetchableFragment(
    graphql`
      fragment VerificationsTable_viewer on Viewer
      @refetchable(queryName: "VerificationsTableQuery")
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        last: { type: "Int" }
        after: { type: "String" }
        before: { type: "String" }
      ) {
        identityVerificationsConnection(
          first: $first
          last: $last
          after: $after
          before: $before
          email: $email
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...ListPagination_pageCursors
          }
          edges {
            node {
              internalID
              state
            }
          }
        }
      }
    `,
    viewer
  )

  const verifications = useExtractNodes(
    viewerData.identityVerificationsConnection
  )

  if (!verifications.length) {
    return null
  }

  const showPagination =
    !!viewerData.identityVerificationsConnection?.pageCursors

  return (
    <>
      <Text variant="xl" mb={4}>
        verifications
      </Text>

      <Suspense fallback={null}>
        <Table
          columns={[
            {
              Header: "internalID",
              accessor: "internalID",
            },
            {
              Header: "state",
              accessor: "state",
            },
          ]}
          data={verifications}
          onRowClick={(row) => {}}
        />
      </Suspense>

      {showPagination && (
        <>
          <Spacer my={2} />

          <ListPagination
            pageCursors={viewerData.identityVerificationsConnection.pageCursors}
            pageInfo={viewerData.identityVerificationsConnection.pageInfo}
            relayRefetch={refetch}
          />
        </>
      )}
    </>
  )
}

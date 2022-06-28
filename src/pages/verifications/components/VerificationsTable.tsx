import { Spacer, Text } from "@artsy/palette"
import { ListPagination } from "components/ListPagination"
import { Table } from "components/Table"
import { useExtractNodes } from "hooks"
import { graphql, useRefetchableFragment } from "react-relay"
import { VerificationsTable_viewer$key } from "__generated__/VerificationsTable_viewer.graphql"
import { VerificationsDetails } from "./VerificationsDetails"

interface VerificationsTableProps {
  viewer: VerificationsTable_viewer$key
  email: string
  userId: string
}

export const VerificationsTable: React.FC<VerificationsTableProps> = (
  props
) => {
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
          userId: $userId
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
              id
              createdAt
              email
              internalID
              name
              state
              userID
              ...VerificationsScanReferences_identityVerification
              ...VerificationsOverrides_identityVerification
            }
          }
        }
      }
    `,
    props.viewer
  )

  const verifications = useExtractNodes(
    viewerData.identityVerificationsConnection
  )

  const showPagination =
    !!viewerData.identityVerificationsConnection?.pageCursors

  return (
    <>
      <Spacer my={2} />
      <Text variant="xl" mb={4}>
        {!!props.email && props.email}
      </Text>
      <Spacer my={2} />
      <Text variant="xl" mb={4}>
        {!!props.userId && props.userId}
      </Text>
      {!verifications.length && (
        <Text variant="xl" mb={4}>
          No Results
        </Text>
      )}
      {!!verifications.length && (
        <>
          <Table
            columns={[
              {
                Header: "Verification ID",
                accessor: "internalID",
              },
              {
                Header: "Created At",
                accessor: "createdAt",
              },
              {
                Header: "State",
                accessor: "state",
              },
              {
                Header: "User ID",
                accessor: "userID",
              },
              {
                Header: "Name",
                accessor: "name",
              },
              {
                Header: "Email",
                accessor: "email",
              },
              {
                Header: "Scans",
                accessor: "scanReferences.length",
              },
              {
                Header: "Overrides",
                accessor: "overrides.length",
              },
            ]}
            data={verifications}
            renderExpandedRow={(row: any) => {
              return (
                <>
                  <VerificationsDetails
                    identityVerificationScanReferences={row.original}
                    identityVerificationOverrides={row.original}
                  />
                </>
              )
            }}
            onRowClick={(row) => {
              //@ts-ignore
              row.toggleRowExpanded()
            }}
          />
          {showPagination && (
            <>
              <Spacer my={2} />

              <ListPagination
                pageCursors={
                  viewerData.identityVerificationsConnection.pageCursors
                }
                pageInfo={viewerData.identityVerificationsConnection.pageInfo}
                relayRefetch={refetch}
              />
            </>
          )}
        </>
      )}
    </>
  )
}

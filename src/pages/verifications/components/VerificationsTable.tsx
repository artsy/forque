import { Spacer, Text } from "@artsy/palette"
import { ListPagination } from "components/ListPagination"
import { Table2 } from "components/Table2"
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
          <Table2<typeof verifications[0]>
            columns={[
              {
                header: "Verification ID",
                accessor: "internalID",
              },
              {
                header: "Created At",
                accessor: "createdAt",
              },
              {
                header: "State",
                accessor: "state",
              },
              {
                header: "User ID",
                accessor: "userID",
              },
              {
                header: "Name",
                accessor: "name",
              },
              {
                header: "Email",
                accessor: "email",
              },
            ]}
            data={verifications}
            renderExpandedRow={({ values }) => {
              return (
                <VerificationsDetails
                  scanReferences={values}
                  overrides={row.original}
                />
              )
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

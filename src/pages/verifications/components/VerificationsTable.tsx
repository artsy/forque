import { Box, Spacer, Text } from "@artsy/palette"
import { ListPagination } from "components/ListPagination"
import { Table } from "components/Table"
import { useExtractNodes } from "hooks"
import { Suspense } from "react"
import { graphql, useRefetchableFragment } from "react-relay"
import { VerificationsTable_viewer$key } from "__generated__/VerificationsTable_viewer.graphql"
import { VerificationsDetails } from "./VerificationsDetails"
import styled from "styled-components"

interface VerificationsTableProps {
  viewer: VerificationsTable_viewer$key
  email: string
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
              createdAt
              internalID
              state
              scanReferences {
                createdAt
                extractedFirstName
                extractedLastName
                extractedIdFailReason
                extractedSimilarityFailReason
                finishedAt
                id
                internalID
                jumioID
                result
              }
              overrides {
                createdAt
                newState
                oldState
                reason
                userID
              }
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

  if (!verifications.length) {
    return null
  }

  const showPagination =
    !!viewerData.identityVerificationsConnection?.pageCursors

  const StyledBox = styled(Box)`
    td {
      padding-bottom:1%;
    }
  }
  `
  return (
    <>
      <Spacer my={2} />

      <Text variant="xl" mb={4}>
        {props.email}
      </Text>

      <Suspense fallback={null}>
        <StyledBox>
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
            ]}
            data={verifications}
            renderExpandedRow={(row) => {
              return (
                <>
                  <VerificationsDetails row={row} />
                </>
              )
            }}
            onRowClick={(row) => {
              row.toggleRowExpanded()
            }}
          />
        </StyledBox>
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

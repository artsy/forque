import { Spacer, Text } from "@artsy/palette"
import { ListPagination } from "components/ListPagination"
import { Table } from "components/Table"
import { useExtractNodes } from "hooks"
import { useRouter } from "next/router"
import { Suspense } from "react"
import { graphql, useRefetchableFragment } from "react-relay"
import { UsersTable_viewer$key } from "__generated__/UsersTable_viewer.graphql"

interface UsersTableProps {
  viewer: UsersTable_viewer$key
}

export const UsersTable: React.FC<UsersTableProps> = ({ viewer }) => {
  const router = useRouter()

  const [viewerData, refetch] = useRefetchableFragment(
    graphql`
      fragment UsersTable_viewer on Viewer
      @refetchable(queryName: "UsersTableQuery")
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        last: { type: "Int" }
        after: { type: "String" }
        before: { type: "String" }
      ) {
        usersConnection(
          first: $first
          last: $last
          after: $after
          before: $before
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
              email
              name
            }
          }
        }
      }
    `,
    viewer
  )

  const users = useExtractNodes(viewerData.usersConnection)

  if (!users.length) {
    return null
  }

  const showPagination = !!viewerData.usersConnection?.pageCursors

  return (
    <>
      <Text variant="xl" mb={4}>
        Users
      </Text>

      <Suspense fallback={null}>
        <Table
          columns={[
            {
              Header: "Name",
              accessor: "name", // accessor is the "key" in the data
            },
            {
              Header: "Email",
              accessor: "email",
            },
            {
              Header: "ID",
              accessor: "internalID",
            },
          ]}
          data={users}
          onRowClick={(row) => {
            router.push(`/users/${row.values.internalID}`)
          }}
        />
      </Suspense>

      {showPagination && (
        <>
          <Spacer my={2} />

          <ListPagination
            pageCursors={viewerData.usersConnection.pageCursors}
            pageInfo={viewerData.usersConnection.pageInfo}
            relayRefetch={refetch}
          />
        </>
      )}
    </>
  )
}

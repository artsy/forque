import { Box, Text } from "@artsy/palette"
import { ListPagination } from "components/ListPagination"
import { useExtractNodes } from "hooks/useExtractNodes"
import Link from "next/link"
import { Suspense } from "react"
import { graphql, useRefetchableFragment } from "react-relay"
import { UsersTable_viewer$key } from "__generated__/UsersTable_viewer.graphql"

interface UsersTableProps {
  viewer: UsersTable_viewer$key
}

export const UsersTable: React.FC<UsersTableProps> = ({ viewer }) => {
  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment UsersTable_viewer on Viewer
      @refetchable(queryName: "UsersTableQuery")
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
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

  const users = useExtractNodes(data.usersConnection)

  if (!users.length) {
    return null
  }

  const showPagination = !!data.usersConnection?.pageCursors

  return (
    <>
      <Text variant="xl" mb={4}>
        Users
      </Text>

      <Suspense fallback={null}>
        {users.map((user) => {
          return (
            <Box key={user.internalID}>
              <Link href={`/users/${user.internalID}`}>{user.name}</Link>
            </Box>
          )
        })}
      </Suspense>

      {showPagination && (
        <ListPagination
          pageCursors={data.usersConnection.pageCursors}
          pageInfo={data.usersConnection.pageInfo}
          relayRefetch={refetch}
        />
      )}
    </>
  )
}

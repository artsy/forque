import { GetServerSideProps } from "next"
import { fetchRelayData } from "system/relay"
import { graphql } from "relay-runtime"
import { usersQuery } from "__generated__/usersQuery.graphql"
import { Box, Text } from "@artsy/palette"
import Head from "next/head"
import { useExtractNodes } from "hooks/useExtractNodes"
import Link from "next/link"

interface UserProps {
  usersConnection: usersQuery["response"]["usersConnection"]
}

const Users: React.FC<UserProps> = ({ usersConnection }) => {
  const users = useExtractNodes(usersConnection)

  if (!users.length) {
    return null
  }

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <Text variant="xl" mb={4}>
        Users
      </Text>

      {users.map((user) => {
        return (
          <Box key={user.internalID}>
            <Link href={`/users/${user.internalID}`}>{user.name}</Link>
          </Box>
        )
      })}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await fetchRelayData({
    query: graphql`
      query usersQuery {
        usersConnection(first: 100) {
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
    variables: {
      userId: ctx.query.userId,
    },
    ctx,
  })

  return {
    props,
  }
}

export default Users

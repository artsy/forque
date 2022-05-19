import { GetServerSideProps } from "next"
import { fetchRelayData } from "system/relay"
import { graphql } from "relay-runtime"
import { usersQuery } from "__generated__/usersQuery.graphql"
import Head from "next/head"
import { UsersTable } from "./components/UsersTable"
import { useSession } from "next-auth/react"
import { Action, assertPermitted, UserWithAccessToken } from "system"

interface UserProps {
  viewer: usersQuery["response"]["viewer"]
}

const Users: React.FC<UserProps> = ({ viewer }) => {
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  assertPermitted(user, Action.list, "users")

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      {viewer && <UsersTable viewer={viewer} />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await fetchRelayData({
    query: graphql`
      query usersQuery {
        viewer {
          ...UsersTable_viewer
        }
      }
    `,
    ctx,
  })

  return {
    props,
  }
}

export default Users

import { GetServerSideProps } from "next"
import { fetchRelayData } from "system/relay"
import { graphql } from "relay-runtime"
import { usersQuery } from "__generated__/usersQuery.graphql"
import Head from "next/head"
import { UsersTable } from "./components/UsersTable"

interface UserProps {
  viewer: usersQuery["response"]["viewer"]
}

const Users: React.FC<UserProps> = ({ viewer }) => {
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

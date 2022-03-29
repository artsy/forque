import { GetServerSideProps } from "next"
import { fetchRelayData } from "system/relay"
import { graphql } from "relay-runtime"
import { UserIdQuery } from "__generated__/UserIdQuery.graphql"
import { Text } from "@artsy/palette"

interface UserProps {
  user: UserIdQuery["response"]["user"]
}

const User: React.FC<UserProps> = ({ user }) => {
  if (!user) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Text>{user.email}</Text>
      <Text>{user.name}</Text>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await fetchRelayData({
    query: graphql`
      query UserIdQuery($userId: String!) {
        me {
          name
        }
        user(id: $userId) {
          email
          name
        }
      }
    `,
    variables: {
      userId: ctx.query.userId,
    },
    cache: true,
    ctx,
  })

  return {
    props,
  }
}

export default User

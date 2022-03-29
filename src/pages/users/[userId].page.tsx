import { useRouter } from "next/router"
import { useMetaphysics } from "system/artsy-next-auth"
import { Text } from "@artsy/palette"

const User: React.FC = () => {
  const router = useRouter()
  const { userId } = router.query

  const { data } = useMetaphysics(
    `
    query UserIdQuery($userId: String!) {
        user(id: $userId) {
            email
        }
    }
    `,
    {
      userId,
    }
  )

  if (!data) {
    return <h1>Loading...</h1>
  }

  return <Text>{data.user.email}</Text>
}

export default User

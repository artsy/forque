import { Text } from "@artsy/palette"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { FC } from "react"
import { Action, assertPermitted, UserWithAccessToken } from "system"
import { MyCollectionTransfer } from "./components/MyCollectionTransfer"

const MyCollectionPage: FC = () => {
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  assertPermitted(user, "my_collection", Action.transfer)

  return (
    <>
      <Head>
        <title>My Collection</title>
      </Head>

      <Text variant="xxl" mb={4}>
        My Collection
      </Text>

      <MyCollectionTransfer />
    </>
  )
}

export const getServerSideProps = () => ({ props: {} })

export default MyCollectionPage

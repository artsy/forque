import { Text } from "@artsy/palette"
import Head from "next/head"
import { FC } from "react"
import { MyCollectionTransfer } from "./components/MyCollectionTransfer"

const MyCollectionPage: FC = () => {
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

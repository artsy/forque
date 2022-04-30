import { Box, Flex, Text } from "@artsy/palette"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { graphql } from "react-relay"
import { fetchRelayData } from "system/relay"
import { pagesQuery$data } from "__generated__/pagesQuery.graphql"

interface HomeProps {
  me: pagesQuery$data["me"]
}

export default function Home({ me }: HomeProps) {
  return (
    <div>
      <Head>
        <title>Artsy</title>
        <meta name="description" content="Artsy admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flexDirection="column" alignItems="center" mt={[4, 12]}>
        <Text variant="xxl">Welcome to Artsy</Text>

        <Text my={4}>Hi, {me?.email}</Text>

        <Box position="relative" width="20em" height="13em">
          <Image
            src="/under.gif"
            layout="fill"
            alt="Pikachu jackhammering in front of an Under Construction sign"
          />
        </Box>
      </Flex>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await fetchRelayData({
    query: graphql`
      query pagesQuery {
        me {
          email
        }
      }
    `,
    cache: true,
    ctx,
  })

  return {
    props,
  }
}

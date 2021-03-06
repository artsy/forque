import { GetServerSideProps } from "next"
import { graphql } from "relay-runtime"
import { ArtistSlugQuery } from "__generated__/ArtistSlugQuery.graphql"
import { Box, Text } from "@artsy/palette"
import { fetchRelayData } from "system/relay"
import Link from "next/link"
import ArtistName from "./ArtistName"

interface ArtistProps {
  artist: ArtistSlugQuery["response"]["artist"]
}

const Artist: React.FC<ArtistProps> = ({ artist }) => {
  if (!artist) {
    return null
  }

  return (
    <Box m={1}>
      <ArtistName artist={artist} />
      <Text variant="md">{artist?.bio}</Text>
      <Link href="/">Home</Link>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await fetchRelayData({
    query: graphql`
      query ArtistSlugQuery($artistSlug: String!) {
        me {
          name
        }
        artist(id: $artistSlug) {
          ...ArtistName_artist
          bio
        }
      }
    `,
    variables: {
      artistSlug: ctx.query.artistSlug,
    },
    cache: true,
    ctx,
  })

  return {
    props,
  }
}

export default Artist

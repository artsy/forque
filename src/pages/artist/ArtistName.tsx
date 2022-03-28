import { Text, Box } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { ArtistName_artist$key } from "__generated__/ArtistName_artist.graphql"

interface ArtistNameProps {
  artist: ArtistName_artist$key
}

const ArtistName: React.FC<ArtistNameProps> = ({ artist }) => {
  const data = useFragment(
    graphql`
      fragment ArtistName_artist on Artist {
        name
      }
    `,
    artist
  )

  return (
    <Box>
      <Text variant="xl">{data?.name}</Text>
    </Box>
  )
}

export default ArtistName

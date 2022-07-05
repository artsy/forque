import Image from "next/image"
import compact from "lodash/compact"
import {
  AutocompleteInputOptionLabelProps,
  Box,
  Flex,
  Text,
} from "@artsy/palette"

export interface Props extends AutocompleteInputOptionLabelProps {
  imageUrl: string
  isTargetSupply: boolean
  nationality: string
  publishedArtworksCount: number
  targetSupplyPriority: number
  years: string
}

export const ArtistAutocompleteOption: React.FC<Props> = (props) => {
  const {
    imageUrl,
    nationality,
    publishedArtworksCount,
    targetSupplyPriority,
    text,
    years,
  } = props
  const priority = targetSupplyPriority && `P${targetSupplyPriority}`
  const works = publishedArtworksCount && `${publishedArtworksCount} works`

  return (
    <Flex alignItems="center" py={1}>
      <Box ml={1} width={60} height={60} bg="black10" position="relative">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={compact([
              "Representative artwork for",
              text,
              nationality,
              years,
            ]).join(", ")}
            layout="fill"
          />
        )}
      </Box>
      <Box flex={1} p={1}>
        <Text overflowEllipsis fontWeight={"bold"}>
          {text}
        </Text>

        <Text lineHeight={1.5} overflowEllipsis textColor="black60">
          {compact([nationality, years, priority, works]).join(", ")}
        </Text>
      </Box>
    </Flex>
  )
}

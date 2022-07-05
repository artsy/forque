import { useState } from "react"
import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  AutocompleteInputProps,
} from "@artsy/palette"
// import { useGravity } from "hooks"
import { ArtistAutocompleteOption } from "./ArtistAutocompleteOption"

/* relay imports */
import { graphql, useLazyLoadQuery } from "react-relay"
import { ArtistAutocompleteQuery } from "__generated__/ArtistAutocompleteQuery.graphql"
import { compact } from "lodash"

type Props = Omit<
  AutocompleteInputProps<ArtistAutocompleteInputOptionType>,
  "options"
>

export const ArtistAutocomplete: React.FC<Props> = ({ onSelect, ...rest }) => {
  const [query, setQuery] = useState<string>("")

  // const { data, isLoading } = useGravity<ArtistMatchHit[]>(
  //   `match/artists?size=10&term=${query}`
  // )
  //
  // const options: (ArtistAutocompleteInputOptionType &
  //   AutocompleteInputOptionType)[] = isLoading ? [] : data.map(hitToOption)

  const data = useLazyLoadQuery<ArtistAutocompleteQuery>(
    graphql`
      query ArtistAutocompleteQuery($query: String!) {
        searchConnection(
          first: 5
          query: $query
          entities: [ARTIST]
          mode: AUTOSUGGEST
        ) {
          edges {
            node {
              href
              ... on Artist {
                slug
                name
                bio
                nationality
                years
                counts {
                  artworks
                }
                imageUrl
                targetSupply {
                  isTargetSupply
                  isP1
                }
              }
            }
          }
        }
      }
    `,
    { query }
  )

  const nodes = data.searchConnection?.edges?.map((edge) => edge?.node)
  const options: ArtistAutocompleteInputOptionType[] = compact(
    (nodes || []).map((node) => {
      if (node !== null && node !== undefined) {
        return {
          imageUrl: node.imageUrl!,
          isTargetSupply: node.targetSupply?.isTargetSupply!,
          nationality: node.nationality!,
          publishedArtworksCount: node.counts?.artworks!,
          targetSupplyPriority: node.targetSupply?.isP1!
            ? 1
            : node.targetSupply?.isTargetSupply!
            ? 2
            : 0,
          text: node.name!,
          value: node.slug!,
          years: node.years!,
        }
      }
    })
  )

  return (
    <AutocompleteInput
      placeholder="Artist name"
      options={options}
      renderOption={(option) => <ArtistAutocompleteOption {...option} />}
      onChange={(e) => setQuery(e.target.value)}
      onSelect={onSelect}
      {...rest}
    />
  )
}

// const hitToOption = (
//   hit: ArtistMatchHit
// ): ArtistAutocompleteInputOptionType => ({
//   imageUrl: hit.image_urls?.square,
//   isTargetSupply: hit.target_supply,
//   nationality: hit.nationality,
//   publishedArtworksCount: hit.published_artworks_count,
//   targetSupplyPriority: hit.target_supply_priority,
//   text: hit.name,
//   value: hit.id,
//   years: hit.years,
// })

// interface ArtistMatchHit {
//   id: string
//   name: string
//   image_urls: Record<string, string>
//   nationality: string
//   years: string
//   published_artworks_count: number
//   target_supply: boolean
//   target_supply_priority: number
// }

export interface ArtistAutocompleteInputOptionType
  extends AutocompleteInputOptionType {
  imageUrl: string
  isTargetSupply: boolean
  nationality: string
  publishedArtworksCount: number
  targetSupplyPriority: number
  years: string
}

import { useState } from "react"
import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  AutocompleteInputProps,
} from "@artsy/palette"
import { useGravity } from "hooks"
import { ArtistAutocompleteOption } from "./ArtistAutocompleteOption"

type Props = Omit<
  AutocompleteInputProps<ArtistAutocompleteInputOptionType>,
  "options"
>

export const ArtistAutocomplete: React.FC<Props> = ({ onSelect, ...rest }) => {
  const [query, setQuery] = useState<string>("")
  const { data, isLoading } = useGravity<ArtistMatchHit[]>(
    `match/artists?size=10&term=${query}`
  )

  const options: (ArtistAutocompleteInputOptionType &
    AutocompleteInputOptionType)[] = isLoading ? [] : data.map(hitToOption)

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

const hitToOption = (
  hit: ArtistMatchHit
): ArtistAutocompleteInputOptionType => ({
  imageUrl: hit.image_urls?.square,
  isTargetSupply: hit.target_supply,
  nationality: hit.nationality,
  publishedArtworksCount: hit.published_artworks_count,
  targetSupplyPriority: hit.target_supply_priority,
  text: hit.name,
  value: hit.id,
  years: hit.years,
})

interface ArtistMatchHit {
  id: string
  name: string
  image_urls: Record<string, string>
  nationality: string
  years: string
  published_artworks_count: number
  target_supply: boolean
  target_supply_priority: number
}

export interface ArtistAutocompleteInputOptionType
  extends AutocompleteInputOptionType {
  imageUrl: string
  isTargetSupply: boolean
  nationality: string
  publishedArtworksCount: number
  targetSupplyPriority: number
  years: string
}

import { useState } from "react"
import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  AutocompleteInputProps,
} from "@artsy/palette"
import { useGravity } from "hooks"
import { UserAutocompleteOption } from "./UserAutocompleteOption"

type Props = Omit<
  AutocompleteInputProps<UserAutocompleteInputOptionType>,
  "options"
>

export const UserAutocomplete: React.FC<Props> = ({ onSelect, ...rest }) => {
  const [query, setQuery] = useState<string>("")
  const { data, isLoading } = useGravity<UserMatchHit[]>(
    `match/users?size=10&term=${query}`
  )

  const options: (UserAutocompleteInputOptionType &
    AutocompleteInputOptionType)[] = isLoading ? [] : data.map(hitToOption)

  return (
    <AutocompleteInput
      placeholder="User name or email"
      options={options}
      renderOption={(option) => <UserAutocompleteOption {...option} />}
      onChange={(e) => setQuery(e.target.value)}
      onSelect={onSelect}
      {...rest}
    />
  )
}

const hitToOption = (hit: UserMatchHit): UserAutocompleteInputOptionType => ({
  email: hit.email,
  text: hit.name,
  value: hit.id,
  isIdentityVerified: hit.identity_verified,
})

interface UserMatchHit {
  id: string
  name: string
  email: string
  identity_verified: boolean
}

export interface UserAutocompleteInputOptionType
  extends AutocompleteInputOptionType {
  email: string
  isIdentityVerified: boolean
}

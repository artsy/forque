import { useState } from "react"
import { Text } from "@artsy/palette"

import { ArtistAutocomplete } from "components/autocomplete/ArtistAutocomplete"
import { UserAutocomplete } from "components/autocomplete/UserAutocomplete"

import type { UserAutocompleteInputOptionType } from "components/autocomplete/UserAutocomplete"
import type { ArtistAutocompleteInputOptionType } from "components/autocomplete/ArtistAutocomplete"

export default function Page() {
  const [selectedArtist, setSelectedArtist] =
    useState<ArtistAutocompleteInputOptionType>()

  const [selectedUser, setSelectedUser] =
    useState<UserAutocompleteInputOptionType>()

  return (
    <div>
      <Text as="h1" variant="xxl" mb={4}>
        Autocompletes Demo
      </Text>

      {/* Artist */}

      <Text as="h2" variant="xl" my={2} pt={2}>
        Artist
      </Text>

      <ArtistAutocomplete onSelect={setSelectedArtist} />

      {selectedArtist && (
        <pre style={{ marginTop: "1em" }}>
          You selected this artist record
          <br />
          {JSON.stringify(selectedArtist, null, 2)}
        </pre>
      )}

      {/* User */}

      <Text as="h2" variant="xl" my={2} pt={2}>
        User
      </Text>

      <UserAutocomplete onSelect={setSelectedUser} />

      {selectedUser && (
        <pre style={{ marginTop: "1em" }}>
          You selected this user record
          <br />
          {JSON.stringify(selectedUser, null, 2)}
        </pre>
      )}
    </div>
  )
}

export const getServerSideProps = () => ({ props: {} }) // HACK

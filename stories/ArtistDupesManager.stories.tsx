import React from "react"

import { ArtistDupesManager } from "../components/artists/dedupe/manager/ArtistDupesManager"
import artistWithDupes from "../components/artists/dedupe/manager/__fixtures__/artist-with-dupes"

export default {
  component: ArtistDupesManager,
}

export const With3Dupes = () => <ArtistDupesManager artist={artistWithDupes} />

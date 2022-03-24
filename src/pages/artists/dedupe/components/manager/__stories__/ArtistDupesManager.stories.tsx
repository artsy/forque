import React from "react"

import { ArtistDupesManager } from "../ArtistDupesManager"
import artistWithDupes from "../__fixtures__/artist-with-dupes"

export default {
  component: ArtistDupesManager,
  title: "Pages/Artists/Dedupe/ArtistDedupesManager",
}

export const With3Dupes = () => <ArtistDupesManager artist={artistWithDupes} />

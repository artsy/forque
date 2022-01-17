/** Typical attributes for artists in the list view. */
export type RecentArtist = {
  slug: string
  name: string
  createdAt: string
  counts: {
    duplicates: number
  }
}

/** Typical attributes for an artist in the deduping view. */
export type Artist = {
  internalID: BsonID
  slug: string
  name: string
  gender: string
  nationality: string
  birthday: string
  deathday: string
  hometown: string
  location: string
}

/** An Artist record that also contains a list of potential dupes for that record. */
export type ArtistWithDupes = Artist & { duplicates: Artist[] }

/** Just a string, but a reminder that some strings are intended to be Mongo database IDs. */
export type BsonID = string

import { useRouter } from "next/router"

import { ArtistDupesManager } from "../../../components/artists/dedupe/manager/ArtistDupesManager"
import { useMetaphysics } from "../../../lib/artsy-next-auth"
import type { ArtistWithDupes } from "../../../components/artists/dedupe/types"

export default function Page() {
  const router = useRouter()
  const { slug } = router.query

  const { data, error, isLoading } = useMetaphysics(
    `
    query DupesForArtist($id: String!) {
        artist(id: $id) {
            ...ArtistFields
            duplicates {
                ...ArtistFields
            }
        }
    }

    fragment ArtistFields on Artist {
        internalID
        slug
        name
        gender
        nationality
        birthday
        deathday
        hometown
        location
    }
    `,
    {
      id: slug,
    }
  )

  console.log({ data, error, isLoading })

  if (isLoading) {
    return "Loading..."
  }

  let artist: ArtistWithDupes

  if (data) {
    artist = data.artist

    return (
      <div className="text-std">
        <h1 className="text-xxl mb-4 ">{artist.name}</h1>
        <ArtistDupesManager artist={artist} />
      </div>
    )
  }
}
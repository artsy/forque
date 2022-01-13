import { useMetaphysics } from "../../lib/artsy-next-auth"
import {
  ArtistList,
  Skeleton,
} from "../../components/artists/dedupe/ArtistList"

const PER_PAGE = 36

export type RecentArtist = {
  slug: string
  name: string
  createdAt: string
  counts: {
    duplicates: number
  }
}

export default function Page() {
  const { data, isLoading } = useMetaphysics(
    `
    query RecentArtists($first: Int) {
      artistsConnection(first: $first, sort: CREATED_AT_DESC) {
        edges {
          node {
            slug
            name
            createdAt
            counts {
              duplicates
            }
          }
        }
      }
    }
  `,
    { first: PER_PAGE }
  )

  let recentArtists: RecentArtist[] = []

  if (data) {
    recentArtists = data.artistsConnection.edges.map(
      ({ node }: { node: RecentArtist }) => node
    )
  }

  return (
    <div>
      <h1 className="text-xxl mb-4 ">Dedupe Artists</h1>

      <div className="text-lg my-4">
        Choose from the following recent artists. Potential duplicate clusters
        are highlighted.
      </div>

      {isLoading ? (
        <div>
          <Skeleton length={PER_PAGE} />
        </div>
      ) : (
        <ArtistList artists={recentArtists} />
      )}
    </div>
  )
}

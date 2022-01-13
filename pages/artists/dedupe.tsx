import { useMetaphysics } from "../../lib/artsy-next-auth"
import {
  ArtistList,
  Skeleton,
} from "../../components/artists/dedupe/ArtistList"
import { useState } from "react"

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
  const [page, setPage] = useState<number>(1)

  const { data, error, isLoading } = useMetaphysics(
    `
    query RecentArtists($size: Int, $page: Int) {
      artistsConnection(size: $size, page: $page, sort: CREATED_AT_DESC) {
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
    { size: PER_PAGE, page }
  )

  let recentArtists: RecentArtist[] = []

  if (error) {
    return (
      <div>
        <h1>Unexpected error</h1>

        <pre>{JSON.stringify(error.message)}</pre>
      </div>
    )
  }

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

      <div className="mb-4">
        <button
          className="bg-black60 text-white100 py-1 px-2 rounded-md mr-1 disabled:bg-black50"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page == 1}
        >
          Previous
        </button>
        <button
          className="bg-black60 text-white100 py-1 px-2 rounded-md mr-1"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
        Showing page {page} of results
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

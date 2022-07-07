import { useState } from "react"
import { useMetaphysics } from "hooks"
import { ArtistList, Skeleton } from "./components/list/ArtistList"
import { useSession } from "next-auth/react"
import { assertPermitted, UserWithAccessToken } from "system"
import { ArtistAutocomplete } from "components/autocomplete/ArtistAutocomplete"
import { useRouter } from "next/router"

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
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  assertPermitted(user, "artists")
  const router = useRouter()

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
        Choose an artist record in order to view and merge its potential
        duplicate records.
      </div>

      <ArtistAutocomplete
        onSelect={(artist) => router.push(`/artists/dedupe/${artist.value}`)}
      />

      <div className="text-lg my-4">
        Or, choose from the following recent artists. Potential duplicate
        clusters are highlighted.
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

// HACK: force ssr
export const getServerSideProps = () => ({ props: {} })

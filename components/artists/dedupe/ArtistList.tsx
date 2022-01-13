import React from "react"
import Link from "next/link"
import { parseISO, formatDistanceToNow } from "date-fns"
import { RecentArtist } from "../../../pages/artists/dedupe"

interface Props {
  artists: RecentArtist[]
}

export const ArtistList: React.FC<Props> = ({ artists }) => {
  return (
    <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-std">
      {artists.map((artist) => (
        <Artist key={artist.slug} artist={artist} />
      ))}
    </div>
  )
}

const Artist: React.FC<{ artist: RecentArtist }> = ({ artist }) => {
  const hasDupes = artist.counts.duplicates > 1
  let ago = ""
  try {
    ago = `${formatDistanceToNow(parseISO(artist.createdAt))} ago`
  } catch (e) {
    console.error(e, artist)
  }

  return hasDupes ? (
    <Link href={`/artists/dedupe/${artist.slug}`}>
      <a className="group p-1 rounded-md">
        <div className="font-bold group-hover:underline">{artist.name}</div>
        <Count n={artist.counts.duplicates} />
        <div className="text-black30 text-md">{ago}</div>
      </a>
    </Link>
  ) : (
    <Link href={`/artists/dedupe/${artist.slug}`}>
      <a className="group p-1">
        <div className="text-black60 group-hover:underline">{artist.name}</div>
        <div className="text-black30 text-md">{ago}</div>
      </a>
    </Link>
  )
}

const Count: React.FC<{ n: number }> = ({ n }) => {
  return n == 1 ? null : <span className="text-red100 ">Cluster of {n}</span>
}

export const Skeleton: React.FC<{ length: number }> = ({ length }) => {
  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
      {Array.from({ length }).map((_, i) => {
        return (
          <div key={i}>
            <div
              className="bg-black5 p-1"
              style={{ width: `${70 + 30 * Math.random()}%` }}
            >
              &nbsp;
            </div>
          </div>
        )
      })}
    </div>
  )
}

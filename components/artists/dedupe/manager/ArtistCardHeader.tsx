import React from "react"
import { Artist } from "../types"
import { RecordStatus } from "./state"

interface Props {
  artist: Artist
  recordStatus?: RecordStatus
}

export const ArtistCardHeader: React.FC<Props> = (props) => {
  const { artist, recordStatus } = props

  const headerColorFor = {
    [RecordStatus.GOOD]: "bg-green100",
    [RecordStatus.BAD]: "bg-red100",
    [RecordStatus.UNKNOWN]: "bg-black100",
  }

  return (
    <div
      data-testid="header"
      className={`p-2 border-black50 ${
        headerColorFor[recordStatus || RecordStatus.UNKNOWN]
      } rounded-t-lg text-white100`}
    >
      <div className="text-lg font-bold">{artist.name}</div>
      <div className="text-sm text-white100 opacity-70 font-mono">
        {artist.slug}
      </div>
    </div>
  )
}

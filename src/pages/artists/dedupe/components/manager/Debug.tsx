import React from "react"
import { useRouter } from "next/router"

import { Artist } from "../types"
import { State } from "./state"

/**
 * Lil helper for examining the app's current state as well as its original incoming data (the artist prop)
 *
 * Can be activated by appending ?debug to the url
 */
export const Debug = ({ artist, state }: { artist: Artist; state: State }) => {
  const router = useRouter()

  const shouldShow = router?.query?.debug !== undefined

  if (shouldShow) {
    return (
      <div className="mt-2 opacity-25 hover:opacity-100">
        {/* current state */}
        <pre className="mt-2">{JSON.stringify(state, null, 2)}</pre>

        {/* artist prop */}
        <textarea
          className="border border-black30 p-1 w-full [height:10em]"
          defaultValue={JSON.stringify(artist)}
        />
      </div>
    )
  }

  return null
}

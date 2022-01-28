import React, { Dispatch } from "react"

import { Artist } from "../types"
import { Action, RecordStatus, State } from "./state"
import { ArtistCardField } from "./ArtistCardField"
import { ArtistCardHeader } from "./ArtistCardHeader"

interface Props {
  /** An artist record */
  artist: Artist

  /** Has the record been selected as a good (keep) or bad (discard) record yet? */
  recordStatus?: RecordStatus

  /** Which editing mode to render */
  mode: ArtistCardMode

  /** Overrides to values in the good record */
  overrides?: State["overrides"]

  /** Top-level dispatch function. */
  dispatch?: Dispatch<Action>
}

/** The different affordances the card can offer: select whole record, or select individual fields.  */
export type ArtistCardMode = "select records" | "select fields"

/**
 * A card representing an artist, for side-by-side comparison and action.
 *
 * The appearance of the card varies depending on its status as a "good" or "bad" record.
 *
 * The card can be rendered in one of two modes:
 * - `select records`: the entire card is clickable in order to select the artist record
 * - `select fields`: each field is clickable in order to select invidual attributes
 */

export const ArtistCard: React.FC<Props> = (props) => {
  const { artist, recordStatus, mode, overrides, dispatch } = props

  return (
    <div className="[min-width:15em]">
      <ArtistCardHeader
        artist={artist}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
      />

      <ArtistCardField
        fieldName="gender"
        fieldValue={artist.gender}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <ArtistCardField
        fieldName="nationality"
        fieldValue={artist.nationality}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <ArtistCardField
        fieldName="birthday"
        fieldValue={artist.birthday}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <ArtistCardField
        fieldName="deathday"
        fieldValue={artist.deathday}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <ArtistCardField
        fieldName="hometown"
        fieldValue={artist.hometown}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <ArtistCardField
        fieldName="location"
        fieldValue={artist.location}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />
    </div>
  )
}

import React, { Dispatch } from "react"

import { Artist } from "../types"
import { Action, RecordStatus, State } from "./state"
import { ArtistCardField, FieldType } from "./ArtistCardField"
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

  /** Addditions to values in the good record */
  additions?: State["additions"]

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
  const { artist, recordStatus, mode, overrides, additions, dispatch } = props

  return (
    <div className="[min-width:15em]">
      <ArtistCardHeader
        artist={artist}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
      />

      <ArtistCardField
        fieldName="gender"
        fieldValue={artist.gender}
        fieldType={FieldType.SINGLE}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <ArtistCardField
        fieldName="nationality"
        fieldValue={artist.nationality}
        fieldType={FieldType.SINGLE}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <ArtistCardField
        fieldName="birthday"
        fieldValue={artist.birthday}
        fieldType={FieldType.SINGLE}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <ArtistCardField
        fieldName="deathday"
        fieldValue={artist.deathday}
        fieldType={FieldType.SINGLE}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <ArtistCardField
        fieldName="hometown"
        fieldValue={artist.hometown}
        fieldType={FieldType.SINGLE}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <ArtistCardField
        fieldName="location"
        fieldValue={artist.location}
        fieldType={FieldType.SINGLE}
        mode={mode}
        overrides={overrides}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <div className={`p-0.5 border border-black30 bg-black30`} />

      <ArtistCardField
        fieldName="artworks"
        fieldValue={artist.counts.artworks}
        fieldType={FieldType.MULTIPLE}
        mode={mode}
        additions={additions}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />

      <ArtistCardField
        fieldName="follows"
        fieldValue={artist.counts.follows}
        fieldType={FieldType.MULTIPLE}
        mode={mode}
        additions={additions}
        recordId={artist.internalID}
        recordStatus={recordStatus || RecordStatus.UNKNOWN}
        dispatch={dispatch}
      />
    </div>
  )
}

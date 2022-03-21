import React, { Dispatch, useState } from "react"
import { Action, RecordStatus, SingleValuedField, State } from "./state"
import { ArtistCardHeader } from "./ArtistCardHeader"
import { Artist } from "../types"

interface Props {
  state: State
  dispatch: Dispatch<Action>
}

/**
 * Final step: confirm before sending merge payload to Gravity
 */
export const Confirm: React.FC<Props> = ({ state }) => {
  const [payload, setPayload] = useState<Payload>()

  const mergedArtist = deriveMergedArtistRecord(state)
  const badArtists = getBadArtists(state)

  return (
    <div>
      <div data-testid="confirmation">
        <p className="my-1">
          The following merged artist record will also receive artworks and
          follows from the discarded record(s):{" "}
          <code>{badArtists.map((a) => a.slug).join(", ")}</code>
        </p>

        <p className="my-1">Would you like to proceed?</p>

        <button
          className="bg-black100 text-white100 p-1 my-2 rounded-lg"
          onClick={async () => {
            const payload = getPayload(state)
            setPayload(payload)
          }}
        >
          Ok, proceed
        </button>
      </div>

      {/* temporary */}
      {payload && (
        <div className="my-2">
          <p className="my-2">Ok, Gravity. Here is your payload:</p>
          <pre className="">{JSON.stringify(payload, null, 2)}</pre>
        </div>
      )}

      <div>
        <ArtistCardHeader
          artist={mergedArtist}
          recordStatus={RecordStatus.GOOD}
        />

        <ConfirmedField fieldName="gender" fieldValue={mergedArtist.gender} />

        <ConfirmedField
          fieldName="nationality"
          fieldValue={mergedArtist.nationality}
        />

        <ConfirmedField
          fieldName="birthday"
          fieldValue={mergedArtist.birthday}
        />

        <ConfirmedField
          fieldName="deathday"
          fieldValue={mergedArtist.deathday}
        />

        <ConfirmedField
          fieldName="hometown"
          fieldValue={mergedArtist.hometown}
        />

        <ConfirmedField
          fieldName="location"
          fieldValue={mergedArtist.location}
        />
      </div>
    </div>
  )
}

function deriveMergedArtistRecord(state: State): Artist {
  const mergedArtist = state.dupes.find(
    (artist) => artist.internalID === state.goodId
  )
  if (!mergedArtist) throw new Error("Good artist is missing")

  // replace overriden fields
  for (const field in state.overrides) {
    const f = field as SingleValuedField
    const preferredId = state.overrides[f]
    if (preferredId) {
      const preferredRecord = state.dupes.find(
        (a) => preferredId === a.internalID
      )
      if (!preferredRecord)
        throw new Error(`Preferred artist for ${field} is missing`)
      mergedArtist[f] = preferredRecord[f]
    }
  }

  // TODO: indicate additive fields?

  return mergedArtist
}

function getBadArtists(state: State): Artist[] {
  const badArtists = (state.badIds || []).map((id) => {
    const badArtist = state.dupes.find((a) => a.internalID == id)
    if (!badArtist) throw new Error("Bad artist is missing")
    return badArtist
  })
  return badArtists
}

type Payload = {
  good_id: State["goodId"]
  bad_ids: State["badIds"]
  overrides: State["overrides"]
  additions: State["additions"]
}

function getPayload(state: State): Payload {
  const { goodId, badIds, overrides, additions } = state
  return {
    good_id: goodId,
    bad_ids: badIds,
    overrides,
    additions,
  }
}

const ConfirmedField: React.FC<{
  fieldName: string
  fieldValue: string | number
}> = ({ fieldName, fieldValue }) => {
  return (
    <div
      className={`p-2 border border-t-0 last:rounded-b-lg border-black30 hover:bg-green5`}
    >
      <div className="text-xs text-black50">{fieldName}</div>
      <div className="[min-height:2em]">{fieldValue}</div>
    </div>
  )
}

import React, { Dispatch } from "react"
import { Action, RecordStatus, SingleValuedField, State } from "./state"
import { ArtistCardHeader } from "./ArtistCardHeader"
import { Artist } from "../types"
import { useMergeArtists } from "../../mutations/useMergeArtists"
import { useToasts } from "@artsy/palette"
import { useRouter } from "next/router"
import omitBy from "lodash/omitBy"
import isEmpty from "lodash/isEmpty"

interface Props {
  state: State
  dispatch: Dispatch<Action>
}

/**
 * Final step: confirm before sending merge payload to Gravity
 */
export const Confirm: React.FC<Props> = ({ state }) => {
  const mergedArtist = deriveMergedArtistRecord(state)
  const badArtists = getBadArtists(state)

  const { submitMutation } = useMergeArtists()
  const { sendToast } = useToasts()

  const router = useRouter()

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
            try {
              const result = await submitMutation({
                variables: {
                  input: {
                    goodId: state.goodId!,
                    badIds: state.badIds,
                    overrides: omitBy(state.overrides, isEmpty),
                  },
                },
              })

              const data = result.mergeArtists?.mergeArtistsResponseOrError
              if (data?.__typename == "MergeArtistsFailure") {
                throw new Error(data.mutationError?.message)
              }

              const goToNextScreen = () => {
                router.push(`/artists/dedupe`)
              }

              sendToast({
                variant: "success",
                message: `Artist merger succeeded`,
                description: `The discarded artists were successfully merged into ${mergedArtist.slug}`,
                ttl: 4000,
              })
              setTimeout(goToNextScreen, 2000)
            } catch (error) {
              sendToast({
                variant: "error",
                message: `Artist merger failed`,
                description: (error as any).message,
              })

              console.error("[forque] Error merging artists:", error)
            }
          }}
        >
          Ok, proceed
        </button>
      </div>

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

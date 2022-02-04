import React, { Dispatch } from "react"
import { Action, getRecordStatus, RecordStatus, State } from "./state"
import { Feedback } from "./Feedback"
import { Progress } from "./Progress"
import { ArtistCard } from "./ArtistCard"

interface Props {
  state: State
  dispatch: Dispatch<Action>
}

/**
 * Second step: choose the record(s) to merge away
 */
export const SelectBadRecords: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <div>
      <Progress state={state} dispatch={dispatch} />
      <Feedback state={state} />

      <div className="flex">
        {state.dupes.map((dupe) => {
          const recordStatus = getRecordStatus(state, dupe)

          return (
            <button
              key={dupe.internalID}
              className="mr-2 text-left hover:shadow-lg focus:shadow-lg"
              onClick={() => {
                if (recordStatus === RecordStatus.GOOD) return // TODO: maybe just don't make it button instead?
                dispatch({ type: "discard artist", id: dupe.internalID })
              }}
            >
              <ArtistCard
                artist={dupe}
                mode="select records"
                recordStatus={getRecordStatus(state, dupe)}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

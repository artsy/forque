import React, { Dispatch } from "react"
import { Action, RecordStatus, State } from "./state"
import { Feedback } from "./Feedback"
import { Progress } from "./Progress"
import { ArtistCard } from "./ArtistCard"

interface Props {
  state: State
  dispatch: Dispatch<Action>
}

/**
 * First step: choose the record to keep
 */
export const SelectGoodRecord: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <div>
      <Progress state={state} dispatch={dispatch} />
      <Feedback state={state} />

      <div className="flex">
        {state.dupes.map((dupe) => (
          <button
            key={dupe.internalID}
            className="mr-2 text-left hover:shadow-lg focus:shadow-lg"
            onClick={() =>
              dispatch({ type: "keep artist", id: dupe.internalID })
            }
          >
            <ArtistCard
              artist={dupe}
              mode="select records"
              recordStatus={RecordStatus.UNKNOWN}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

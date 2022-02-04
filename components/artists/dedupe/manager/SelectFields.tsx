import React, { Dispatch } from "react"
import { Action, getRecordStatus, State } from "./state"
import { Feedback } from "./Feedback"
import { Progress } from "./Progress"
import { ArtistCard } from "./ArtistCard"

interface Props {
  state: State
  dispatch: Dispatch<Action>
}

/**
 * Third step: choose values from the "bad" record(s) to override the "good" ones
 */
export const SelectFields: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <div>
      <Progress state={state} dispatch={dispatch} />
      <Feedback state={state} />

      <div className="flex">
        {state.dupes.map((dupe) => {
          return (
            <div key={dupe.internalID} className="mr-2 text-left">
              <ArtistCard
                artist={dupe}
                mode="select fields"
                recordStatus={getRecordStatus(state, dupe)}
                overrides={state.overrides}
                dispatch={dispatch}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

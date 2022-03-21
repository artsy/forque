import React, { useReducer } from "react"

import type { ArtistWithDupes } from "../types"
import { initialState, reducer, Step } from "./state"
import { SelectGoodRecord } from "./SelectGoodRecord"
import { SelectBadRecords } from "./SelectBadRecords"
import { SelectFields } from "./SelectFields"
import { Confirm } from "./Confirm"
import { Debug } from "./Debug"

interface Props {
  artist: ArtistWithDupes
}

/**
 * The entry point for the dupe management UI.
 *
 * Sets up the state management, and then really
 * just a big switch that delegates to various
 * steps in the wizard-like UI.
 */

export const ArtistDupesManager: React.FC<Props> = ({ artist }) => {
  const { duplicates, ...artistAttrs } = artist

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    dupes: duplicates,
    artist: artistAttrs,
  })

  let currentStepUI: JSX.Element

  switch (state.currentStep) {
    case Step.SELECT_GOOD_RECORD:
      currentStepUI = <SelectGoodRecord state={state} dispatch={dispatch} />
      break
    case Step.SELECT_BAD_RECORD:
      currentStepUI = <SelectBadRecords state={state} dispatch={dispatch} />
      break
    case Step.SELECT_FIELDS:
      currentStepUI = <SelectFields state={state} dispatch={dispatch} />
      break
    case Step.CONFIRM:
      currentStepUI = <Confirm state={state} dispatch={dispatch} />
      break
    default:
      currentStepUI = <span>Hmm did not see that coming 🤔</span>
  }

  return (
    <>
      {currentStepUI}
      <Debug artist={artist} state={state} />
    </>
  )
}

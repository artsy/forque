import React, { Dispatch } from "react"
import { Action, State, Step } from "./state"

interface Props {
  state: State
  dispatch: Dispatch<Action>
}

/**
 * List the steps and indicate which one is current.
 * Display controls for restarting and (sometimes) advancing.
 */

export const Progress: React.FC<Props> = ({ state, dispatch }) => {
  const { currentStep } = state

  return (
    <div className="flex justify-left mb-2">
      <div className="mb-2 order-1">
        <span
          data-test-is-current-step={currentStep == Step.SELECT_GOOD_RECORD}
          className={`inline-block mr-1 font-bold text-black30 ${
            currentStep == Step.SELECT_GOOD_RECORD &&
            "text-black100 border-b p-b-1"
          }`}
        >
          1. Select good record
        </span>
        <span
          data-test-is-current-step={currentStep == Step.SELECT_BAD_RECORD}
          className={`inline-block mr-1 font-bold text-black30 ${
            currentStep == Step.SELECT_BAD_RECORD &&
            "text-black100 border-b p-b-1"
          }`}
        >
          2. Select bad records
        </span>
        <span
          data-test-is-current-step={currentStep == Step.SELECT_FIELDS}
          className={`inline-block mr-1 font-bold text-black30 ${
            currentStep == Step.SELECT_FIELDS && "text-black100 border-b p-b-1"
          }`}
        >
          3. Select data to merge
        </span>
      </div>
      <div className="order-2 ml-2">
        <button
          className="bg-black100 text-white100 font-bold text-sm py-0.5 px-1 rounded-lg ml-1"
          onClick={() => {
            dispatch({ type: "reset" })
          }}
        >
          ⇤ Reset
        </button>
        <button
          className="bg-black100 text-white100 font-bold text-sm py-0.5 px-1 rounded-lg ml-1 disabled:bg-black60"
          disabled={!isAbleToContinue(state)}
          onClick={() => {
            dispatch({ type: "continue to step", step: currentStep + 1 })
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

function isAbleToContinue(state: State): boolean {
  const { currentStep } = state

  // can continue if you've already selected bad record(s)
  if (currentStep === Step.SELECT_BAD_RECORD && state.badIds.length > 0)
    return true

  // can continue if you've got no more fields to override
  if (currentStep === Step.SELECT_FIELDS) return true

  // otherwise you've probably still got something left to do
  return false
}

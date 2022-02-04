import React, { Dispatch } from "react"

import { BsonID } from "../types"
import { Action, RecordStatus, SimpleField, State } from "./state"
import { ArtistCardMode } from "./ArtistCard"

interface Props {
  /** The name of the field on the Artist record */
  fieldName: SimpleField

  /** The value of the field on the Artist record, probably a string */
  fieldValue: string

  /** The record being renderer */
  recordId: BsonID

  /** Which editing mode to render */
  mode: ArtistCardMode

  /** Overrides to values in the good record */
  overrides?: State["overrides"]

  /** Has the record been selected as a good (keep) or bad (discard) record yet? */
  recordStatus: RecordStatus

  /** Top-level dispatch function. */
  dispatch?: Dispatch<Action>
}

export const ArtistCardField: React.FC<Props> = (props) => {
  const {
    fieldName,
    fieldValue,
    mode,
    overrides,
    recordId,
    recordStatus,
    dispatch,
  } = props

  if (mode == "select records") {
    // this is the simple case, used in the earlier steps:
    // render a plain read-only field
    return (
      <div className="p-2 border border-t-0 last:rounded-b-lg border-black30">
        <div className="text-xs text-black50">{fieldName}</div>
        <div className="[min-height:2em]">{fieldValue}</div>
      </div>
    )
  } else if (mode == "select fields") {
    // this is the fancy case, used in the later step:
    // render a clickable field that also reflects
    // whether this field is preferred, overridden, or neither

    if (!overrides || !dispatch)
      throw new Error(
        `Current overrides and dispatch method are required in "${mode}" mode`
      )

    const { bgColor, isOverridenValue, isPreferredValue } = getVisualState({
      fieldName,
      overrides,
      recordId,
      recordStatus,
    })

    return (
      <button
        className="block group text-left w-full hover:shadow-lg focus:shadow-lg"
        onClick={() => {
          if (recordStatus == RecordStatus.GOOD) {
            // a previous override is being undone
            dispatch({ type: "prefer value", fieldName, recordId: null })
          } else {
            // a new override is being created
            dispatch({ type: "prefer value", fieldName, recordId })
          }
        }}
      >
        <div
          className={`p-2 border border-t-0 group-last:rounded-b-lg border-black30 ${bgColor} hover:bg-green5`}
        >
          <div className="text-xs text-black50">{fieldName}</div>
          <div className="[min-height:2em]">
            {isOverridenValue ? (
              <del>{fieldValue}</del>
            ) : isPreferredValue ? (
              <strong>{fieldValue}</strong>
            ) : (
              fieldValue
            )}
          </div>
        </div>
      </button>
    )
  } else {
    return <div>Hmm did not see that coming 🤔</div>
  }
}

/**
 * A field from a "bad" record can be preferred,
 * and thus override a field from a "good" record.
 *
 * The UI should reflect that.
 */

function getVisualState(args: {
  fieldName: SimpleField
  overrides: State["overrides"]
  recordId: BsonID
  recordStatus: RecordStatus
}): VisualState {
  const { fieldName, overrides, recordId, recordStatus } = args

  // does this field have an override in some record?
  const isFieldOveridden = Boolean(overrides[fieldName])

  // is this the "bad" record that is overriding this field's value?
  const isPreferredValue = overrides[fieldName] === recordId

  // is this the "good" record whose value in this field is getting overridden?
  const isOverridenValue = Boolean(
    recordStatus === RecordStatus.GOOD && isFieldOveridden
  )

  let bgColor = "bg-white100" // ignored
  if (isOverridenValue) bgColor = "bg-red5" // overridden
  if (isPreferredValue) bgColor = "bg-green5" // preferred
  if (recordStatus === RecordStatus.GOOD && !isFieldOveridden)
    bgColor = "bg-green5" // still good

  return { bgColor, isOverridenValue, isPreferredValue }
}

interface VisualState {
  bgColor: string
  isOverridenValue: boolean
  isPreferredValue: boolean
}

import React, { Dispatch } from "react"
import { BsonID } from "../types"
import { Action, RecordStatus, SingleValuedField, State } from "./state"

interface Props {
  fieldName: SingleValuedField
  fieldValue: string | number
  overrides: State["overrides"]
  recordId: BsonID
  recordStatus: RecordStatus
  dispatch: Dispatch<Action>
}

export const ArtistCardFieldSingleSelect: React.FC<Props> = (props) => {
  const { fieldName, fieldValue, overrides, recordId, recordStatus, dispatch } =
    props

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
          dispatch({
            type: "prefer value",
            fieldName: fieldName as SingleValuedField,
            recordId: null,
          })
        } else {
          // a new override is being created
          dispatch({
            type: "prefer value",
            fieldName: fieldName as SingleValuedField,
            recordId,
          })
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
}

/**
 * A field from a "bad" record can be preferred,
 * and thus override a field from a "good" record.
 *
 * The UI should reflect that.
 */

export function getVisualState(args: {
  fieldName: SingleValuedField
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

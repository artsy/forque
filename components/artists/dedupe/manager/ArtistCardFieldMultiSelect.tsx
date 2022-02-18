import React, { Dispatch } from "react"
import { BsonID } from "../types"
import { Action, RecordStatus, MultiValuedField, State } from "./state"

interface Props {
  fieldName: MultiValuedField
  fieldValue: string | number
  additions: State["additions"]
  recordId: BsonID
  recordStatus: RecordStatus
  dispatch: Dispatch<Action>
}

export const ArtistCardFieldMultiSelect: React.FC<Props> = (props) => {
  const { fieldName, fieldValue, additions, recordId, recordStatus } = props

  const { bgColor, isIncluded } = getVisualState({
    fieldName,
    additions,
    recordId,
    recordStatus,
  })

  return (
    /**
     * after discussing with stakeholder, disabling this toggle functionality for now, since it might just produced orphaned data
     */

    // <button
    //   className="block group text-left w-full hover:shadow-lg focus:shadow-lg"
    //   onClick={() => {
    //     if (additions[fieldName].includes(recordId)) {
    //       // a previous addition is being undone
    //       dispatch({
    //         type: "remove value",
    //         fieldName: fieldName as MultiValuedField,
    //         recordId,
    //       })
    //     } else if (recordStatus === RecordStatus.BAD) {
    //       // a field from a "bad" record is being added
    //       dispatch({
    //         type: "add value",
    //         fieldName: fieldName as MultiValuedField,
    //         recordId,
    //       })
    //     }
    //     */
    //   }}
    // >
    <div
      className={`p-2 border border-t-0 group-last:rounded-b-lg border-black30 ${bgColor} hover:bg-green5`}
    >
      <div className="text-xs text-black50">{fieldName}</div>
      <div className="[min-height:2em]">
        {isIncluded ? <strong>{fieldValue}</strong> : fieldValue}
      </div>
    </div>
    // </button>
  )
}

/**
 * A field from a "bad" record can be merged into a field from a "good" record.
 *
 * The UI should reflect that.
 */

export function getVisualState(args: {
  fieldName: MultiValuedField
  additions: State["additions"]
  recordId: BsonID
  recordStatus: RecordStatus
}): VisualState {
  const { fieldName, additions, recordId, recordStatus } = args

  const isGood = recordStatus === RecordStatus.GOOD
  const isMerged = additions[fieldName]?.includes(recordId)
  const isIncluded = isGood || isMerged

  let bgColor = "bg-white100" // ignored
  if (isIncluded) bgColor = "bg-green5"

  return { bgColor, isIncluded }
}

interface VisualState {
  bgColor: string
  isIncluded: boolean
}

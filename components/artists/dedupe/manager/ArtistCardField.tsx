import React, { Dispatch } from "react"

import { BsonID } from "../types"
import {
  Action,
  RecordStatus,
  MultiValuedField,
  SingleValuedField,
  State,
} from "./state"
import { ArtistCardMode } from "./ArtistCard"
import { ArtistCardFieldMultiSelect } from "./ArtistCardFieldMultiSelect"
import { ArtistCardFieldSingleSelect } from "./ArtistCardFieldSingleSelect"

interface Props {
  /** The name of the field on the Artist record */
  fieldName: SingleValuedField | MultiValuedField

  /** The value of the field on the Artist record, a string for SimpleFields or a number for RelatedEntities */
  fieldValue: string | number

  /** Is this field single- or multi-valued? */
  fieldType: FieldType

  /** The record being renderer */
  recordId: BsonID

  /** Which editing mode to render */
  mode: ArtistCardMode

  /** Overrides to values in the good record */
  overrides?: State["overrides"]

  /** Additions to values in the good record */
  additions?: State["additions"]

  /** Has the record been selected as a good (keep) or bad (discard) record yet? */
  recordStatus: RecordStatus

  /** Top-level dispatch function. */
  dispatch?: Dispatch<Action>
}

/**
 * Whether the merger can handle exactly one preferred value (e.g birthday, hometown),
 * or can accumulate multiple additive values (e.g alternate names; follows)
 */
export enum FieldType {
  SINGLE = "single",
  MULTIPLE = "multiple",
}

export const ArtistCardField: React.FC<Props> = (props) => {
  const {
    fieldName,
    fieldValue,
    fieldType,
    mode,
    overrides,
    additions,
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

    if (!dispatch) throw new Error(`Current dispatch method required`)

    if (fieldType == FieldType.SINGLE) {
      if (!overrides) throw new Error(`Current overrides are required`)

      return (
        <ArtistCardFieldSingleSelect
          fieldName={fieldName as SingleValuedField}
          fieldValue={fieldValue}
          overrides={overrides}
          recordId={recordId}
          recordStatus={recordStatus}
          dispatch={dispatch}
        />
      )
    } /* FieldType.MULTIPLE */ else {
      if (!additions) throw new Error(`Current additions are required`)
      return (
        <ArtistCardFieldMultiSelect
          fieldName={fieldName as MultiValuedField}
          fieldValue={fieldValue}
          additions={additions}
          recordId={recordId}
          recordStatus={recordStatus}
          dispatch={dispatch}
        />
      )
    }
  } else {
    return <div>Hmm did not see that coming 🤔</div>
  }
}

import { Artist, BsonID } from "../types"

/**
 * The global state for the deduping app
 */
export type State = {
  /** The current step in the wizard-style dedupe process */
  currentStep: Step

  /** The Artist record for which we are managing dupes */
  artist: Artist | null

  /** The cluster of dupes for this Artist (may include the Artist record itself) */
  dupes: Artist[]

  /** The "good" Artist record that will be retained after the merge. */
  goodId: BsonID | null

  /** The "bad" Artist record(s) that will be discarded after the merge. */
  badIds: BsonID[]

  /** A map indicating if any of the bad records’ values should be used to override the corresponding value in the good record */
  overrides: Record<SingleValuedField, BsonID | null>

  /** A map indicating if any of the bad records’ values should be additively merged into the corresponding values in the good record */
  additions: Record<MultiValuedField, BsonID[]>
}

/**
 * The possible user-designated states in which one of the dupe records can exist, through this process
 */
export enum RecordStatus {
  GOOD = "good",
  BAD = "bad",
  UNKNOWN = "unknown",
}

/**
 * The list of steps in the wizard-style dedupe process
 */
export enum Step {
  SELECT_GOOD_RECORD,
  SELECT_BAD_RECORD,
  SELECT_FIELDS,
  CONFIRM,
}

/**
 * A list of simple attributes that can be kept or overriden
 */
export type SingleValuedField =
  | "gender"
  | "nationality"
  | "birthday"
  | "deathday"
  | "hometown"
  | "location"

/**
 * A list of related attributes or entities that can be merged, cumulatively,
 * from "bad" records into the "good" record.
 *
 * (At the datasbase level these may ultimately be different instances, as in artworks.
 * Or they may just be different values in an array or delimited field, as in alternate names.
 * The de-duping tool need not know which.)
 */
export type MultiValuedField = "artworks" | "follows"

/**
 * Used for initializing or resetting the app's state
 */
export const initialState: State = {
  currentStep: Step.SELECT_GOOD_RECORD,
  artist: null,
  dupes: [],
  goodId: null,
  badIds: [],
  overrides: {
    gender: null,
    nationality: null,
    birthday: null,
    deathday: null,
    hometown: null,
    location: null,
  },
  additions: {
    artworks: [],
    follows: [],
  },
}

/**
 * The actions that can be triggered in the deduping interface
 */
export type Action =
  | { type: "keep artist"; id: BsonID }
  | { type: "discard artist"; id: BsonID }
  | {
      type: "prefer value"
      fieldName: SingleValuedField
      recordId: BsonID | null
    }
  | { type: "add value"; fieldName: MultiValuedField; recordId: BsonID }
  | { type: "remove value"; fieldName: MultiValuedField; recordId: BsonID }
  | { type: "reset" }
  | { type: "continue to step"; step: Step }

/**
 * Reducer function to produce state updates in the deduping interface
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "keep artist":
      return {
        ...state,
        goodId: action.id,
        currentStep: Step.SELECT_BAD_RECORD,
      }
    case "discard artist":
      // maybe auto-advance too, if all remaining records are accounted for
      return {
        ...state,
        badIds: Array.from(new Set([...state.badIds, action.id])),
        currentStep: maybeAutoAdvance(state),
      }
    case "continue to step":
      return {
        ...state,
        currentStep: action.step,
      }
    case "reset":
      return { ...initialState, artist: state.artist, dupes: state.dupes }
    case "prefer value":
      return {
        ...state,
        overrides: { ...state.overrides, [action.fieldName]: action.recordId },
      }
    case "add value":
      return {
        ...state,
        additions: {
          ...state.additions,
          [action.fieldName]: [
            ...state.additions[action.fieldName as MultiValuedField],
            action.recordId,
          ],
        },
      }
    case "remove value":
      return {
        ...state,
        additions: {
          ...state.additions,
          [action.fieldName]: state.additions[
            action.fieldName as MultiValuedField
          ].filter((id) => id !== action.recordId),
        },
      }
    default:
      return state
  }
}

/**
 * Determine whether we can automatically advance from the
 * "select bad" step to the "select fields" step
 */
function maybeAutoAdvance(state: State) {
  const clusterIds = Array.from(
    new Set(state.dupes.map((dupe) => dupe.internalID))
  )
  const selectedIds = Array.from(new Set([state.goodId, ...state.badIds]))
  const readyToAdvance = clusterIds.length == selectedIds.length + 1

  return readyToAdvance ? Step.SELECT_FIELDS : Step.SELECT_BAD_RECORD
}

/**
 * Derive the RecordStatus of a record based on current app state
 */
export function getRecordStatus(
  state: State,
  recordOrID: BsonID | Artist
): RecordStatus {
  let id
  if (typeof recordOrID === "string") {
    id = recordOrID
  } else {
    id = recordOrID.internalID
  }

  if (state.goodId === id) return RecordStatus.GOOD
  if (state.badIds.includes(id)) return RecordStatus.BAD
  return RecordStatus.UNKNOWN
}

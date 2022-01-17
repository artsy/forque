import { Artist } from "../../types"
import {
  initialState,
  State,
  Action,
  reducer,
  Step,
  getRecordStatus,
  RecordStatus,
} from "../state"

describe("initial state", () => {
  it("starts at step 1", () => {
    expect(initialState.currentStep).toEqual(Step.SELECT_GOOD_RECORD)
  })
})

describe("actions", () => {
  describe("keep artist", () => {
    it("marks a record as good", () => {
      const previousState: State = initialState
      const action: Action = { type: "keep artist", id: "foobar" }

      const state = reducer(previousState, action)

      expect(state.goodId).toEqual("foobar")
    })
  })

  describe("discard artist", () => {
    it("marks a record as bad", () => {
      const previousState: State = initialState
      const action: Action = { type: "discard artist", id: "foobar" }

      const state = reducer(previousState, action)

      expect(state.badIds).toEqual(["foobar"])
    })
  })

  describe("continue to step", () => {
    it("moves to arbitrary step", () => {
      const previousState: State = initialState
      const action: Action = {
        type: "continue to step",
        step: Step.SELECT_BAD_RECORD,
      }

      const state = reducer(previousState, action)

      expect(state.currentStep).toEqual(Step.SELECT_BAD_RECORD)
    })
  })

  describe("reset", () => {
    it("moves to initial step", () => {
      const previousState: State = {
        ...initialState,
        currentStep: Step.SELECT_BAD_RECORD,
      }
      const action: Action = { type: "reset" }

      const state = reducer(previousState, action)

      expect(state.currentStep).toEqual(Step.SELECT_GOOD_RECORD)
    })
  })

  describe("reset", () => {
    it("moves to initial step", () => {
      const previousState: State = initialState
      const action: Action = { type: "reset" }

      const state = reducer(previousState, action)

      expect(state.currentStep).toEqual(Step.SELECT_GOOD_RECORD)
    })

    it("retains the already loaded artist data", () => {
      const previousState: State = {
        ...initialState,
        artist: {
          slug: "the-artist",
        },
        dupes: [
          {
            slug: "the-other-artist",
          },
        ],
      } as State // coercion required since we don't have all the deep attrs

      const action: Action = { type: "reset" }

      const state = reducer(previousState, action)

      expect(state.artist?.slug).toEqual("the-artist")
      expect(state.dupes[0]?.slug).toEqual("the-other-artist")
    })
  })

  describe("prefer value", () => {
    it("marks a record as overriding the given field", () => {
      const previousState: State = initialState
      const action: Action = {
        type: "prefer value",
        fieldName: "nationality",
        recordId: "foobar",
      }

      const state = reducer(previousState, action)

      expect(state.overrides.nationality).toEqual("foobar")
    })
  })
})

describe(getRecordStatus, () => {
  it("gets the status of an unknown record", () => {
    const state: State = initialState

    expect(getRecordStatus(state, "foobar")).toEqual(RecordStatus.UNKNOWN)
  })

  it("gets the status of a good record", () => {
    const state: State = {
      ...initialState,
      goodId: "foobar",
    }

    expect(getRecordStatus(state, "foobar")).toEqual(RecordStatus.GOOD)
  })

  it("gets the status of a bad record", () => {
    const state: State = {
      ...initialState,
      badIds: ["foobar"],
    }

    expect(getRecordStatus(state, "foobar")).toEqual(RecordStatus.BAD)
  })

  it("takes a either record id or an actual Artist record as input", () => {
    const state: State = {
      ...initialState,
      goodId: "foobar",
    }

    expect(getRecordStatus(state, "foobar")).toEqual(RecordStatus.GOOD)

    expect(getRecordStatus(state, { internalID: "foobar" } as Artist)).toEqual(
      RecordStatus.GOOD
    )
  })
})

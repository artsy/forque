import React, { Dispatch } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { ArtistCardField } from "../ArtistCardField"
import { Action, initialState, RecordStatus } from "../state"

describe("when mode is 'select records'", () => {
  it("displays the field name and value", () => {
    render(
      <ArtistCardField
        fieldName="birthday"
        fieldValue="1950"
        mode="select records"
        recordId="foobar"
        recordStatus={RecordStatus.UNKNOWN}
      />
    )

    expect(screen.getByText("birthday")).toBeInTheDocument()
    expect(screen.getByText("1950")).toBeInTheDocument()
  })
})

describe("when mode is 'select fields'", () => {
  let dispatch: jest.MockedFunction<Dispatch<Action>>

  beforeEach(() => {
    dispatch = jest.fn()
  })

  it("displays the field name and value as a clickable element", () => {
    render(
      <ArtistCardField
        fieldName="birthday"
        fieldValue="1950"
        mode="select fields"
        recordId="foobar"
        recordStatus={RecordStatus.UNKNOWN}
        overrides={initialState.overrides}
        dispatch={dispatch}
      />
    )

    expect(screen.getByText("birthday")).toBeInTheDocument()
    expect(screen.getByText("1950")).toBeInTheDocument()

    userEvent.click(screen.getByRole("button"))
    expect(dispatch).toHaveBeenCalledWith({
      type: "prefer value",
      fieldName: "birthday",
      recordId: "foobar",
    } as Action)
  })
})

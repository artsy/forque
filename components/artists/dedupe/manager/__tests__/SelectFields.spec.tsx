import React from "react"
import { render, screen } from "@testing-library/react"

import { SelectFields } from "../SelectFields"
import { initialState } from "../state"
import artist from "../__fixtures__/artist-with-dupes"

it("renders a (non-clickable) card for each dupe", () => {
  const dispatch = jest.fn()
  render(
    <SelectFields
      state={{ ...initialState, dupes: artist.duplicates }}
      dispatch={dispatch}
    />
  )

  expect(screen.getByText(/warren-king-2/)).toBeInTheDocument()
  expect(screen.getByText(/warren-king-1/)).toBeInTheDocument()
  expect(screen.getByText(/warren-king$/)).toBeInTheDocument()
})

it("upon mount, dispactches actions to add values from bad records' multi-valued fields", () => {
  const dispatch = jest.fn()
  render(
    <SelectFields
      state={{
        ...initialState,
        badIds: ["foo", "bar"],
        dupes: artist.duplicates,
      }}
      dispatch={dispatch}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "add value",
      fieldName: expect.anything(),
      recordId: "foo",
    })
  )
})

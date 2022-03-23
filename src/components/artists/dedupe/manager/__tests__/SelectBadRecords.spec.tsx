import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { SelectBadRecords } from "../SelectBadRecords"
import { Action, initialState } from "../state"
import artist from "../__fixtures__/artist-with-dupes"

it("renders a clickable card for each dupe", () => {
  const dispatch = jest.fn()
  render(
    <SelectBadRecords
      state={{ ...initialState, dupes: artist.duplicates }}
      dispatch={dispatch}
    />
  )

  expect(
    screen.getByRole("button", { name: /warren-king-2/ })
  ).toBeInTheDocument()
  expect(
    screen.getByRole("button", { name: /warren-king-1/ })
  ).toBeInTheDocument()
  expect(
    screen.getByRole("button", { name: /warren-king[^-]/ })
  ).toBeInTheDocument()

  userEvent.click(screen.getByRole("button", { name: /warren-king-2/ }))

  expect(dispatch).toHaveBeenCalledWith({
    type: "discard artist",
    id: "61d6b75c67697a000b16ce43",
  } as Action)
})

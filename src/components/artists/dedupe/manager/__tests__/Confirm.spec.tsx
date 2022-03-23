import React from "react"
import { render, screen, within } from "@testing-library/react"

import { Confirm } from "../Confirm"
import { State, initialState } from "../state"
import artist from "../__fixtures__/artist-with-dupes"

it("renders a card for the merged artist", () => {
  const dispatch = jest.fn()

  const goodArtist = artist.duplicates[0]
  const badArtist = artist.duplicates[1]

  const state: State = {
    ...initialState,
    goodId: goodArtist.internalID,
    badIds: [badArtist.internalID],
  }

  render(
    <Confirm
      state={{ ...state, dupes: artist.duplicates }}
      dispatch={dispatch}
    />
  )

  expect(screen.getByTestId("header")).toHaveTextContent(goodArtist.name)
  expect(screen.getByTestId("header")).toHaveTextContent(goodArtist.slug)

  const confirmation = screen.getByTestId("confirmation")
  expect(within(confirmation).getByText(badArtist.slug)).toBeInTheDocument()

  expect(
    screen.getByRole("button", { name: "Ok, proceed" })
  ).toBeInTheDocument()
})

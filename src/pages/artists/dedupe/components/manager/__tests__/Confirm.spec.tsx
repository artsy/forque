import React from "react"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Confirm } from "../Confirm"
import { State, initialState } from "../state"
import artist from "../__fixtures__/artist-with-dupes"

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    NEXT_PUBLIC_GRAVITY_URL: "https://stagingapi.artsy.net",
  },
}))

const mockSendToast = jest.fn()

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useToasts: () => ({
    sendToast: mockSendToast,
  }),
}))

const mockMergeArtistsMutation = jest.fn(() => ({
  mergeArtists: {
    mergeArtistsResponseOrError: {
      artist: {
        slug: "successfully-merged-artist",
      },
    },
  },
}))

jest.mock("../../../mutations/useMergeArtists", () => ({
  useMergeArtists: () => ({ submitMutation: mockMergeArtistsMutation }),
}))

const dispatch = jest.fn()

const goodArtist = artist.duplicates[0]
const badArtist = artist.duplicates[1]

const state: State = {
  ...initialState,
  goodId: goodArtist.internalID,
  badIds: [badArtist.internalID],
  overrides: {
    gender: badArtist.internalID,
    nationality: badArtist.internalID,
    birthday: null,
    deathday: null,
    hometown: null,
    location: null,
  },
}

it("renders a card for the merged artist and a button to proceed", async () => {
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

it("calls the mutation upon button press", async () => {
  render(
    <Confirm
      state={{ ...state, dupes: artist.duplicates }}
      dispatch={dispatch}
    />
  )

  await userEvent.click(screen.getByRole("button", { name: "Ok, proceed" }))

  expect(mockMergeArtistsMutation).toHaveBeenCalledWith({
    variables: {
      input: {
        goodId: goodArtist.internalID,
        badIds: [badArtist.internalID],
        overrides: {
          gender: badArtist.internalID,
          nationality: badArtist.internalID,
        },
      },
    },
  })
})

it("displays a toast upon success", async () => {
  render(
    <Confirm
      state={{ ...state, dupes: artist.duplicates }}
      dispatch={dispatch}
    />
  )

  await userEvent.click(screen.getByRole("button", { name: "Ok, proceed" }))

  expect(mockSendToast).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Artist merger succeeded",
    })
  )
})

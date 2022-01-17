import React from "react"
import { render, screen } from "@testing-library/react"

import { Feedback } from "../Feedback"
import { Step, State } from "../state"
import artist from "../__fixtures__/artist-with-dupes"

it("renders before any user action", () => {
  const state: State = { ...defaultState }

  render(<Feedback state={state} />)

  expect(
    screen.getByText(/The following cluster of \d+ dupes was found./)
  ).toBeInTheDocument()
})

it("renders after good record is selected", () => {
  const state: State = {
    ...defaultState,
    goodId: "61d6b75c67697a000b16ce43",
  }

  render(<Feedback state={state} />)

  expect(screen.getByText(/Keeping/)).toBeInTheDocument()
})

it("renders after bad records are selected", () => {
  const state: State = {
    ...defaultState,
    goodId: "61d6b75c67697a000b16ce43",
    badIds: ["5c33c6856196a57e5255e29e", "5cae0291e398462d85c1387f"],
  }

  render(<Feedback state={state} />)

  expect(screen.getByText(/Discarding/)).toBeInTheDocument()
})

it("renders after field overrides are selected", () => {
  const state: State = {
    ...defaultState,
    goodId: "61d6b75c67697a000b16ce43",
    badIds: ["5c33c6856196a57e5255e29e", "5cae0291e398462d85c1387f"],
    overrides: {
      ...defaultState.overrides,
      deathday: "2022",
    },
  }

  render(<Feedback state={state} />)

  expect(screen.getByText(/Overriding/)).toBeInTheDocument()
})

const { duplicates, ...artistAttrs } = artist

const defaultState: State = {
  currentStep: Step.SELECT_GOOD_RECORD,
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
  artist: artistAttrs,
  dupes: duplicates,
}

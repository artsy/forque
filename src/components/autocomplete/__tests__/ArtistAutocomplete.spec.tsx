import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"

import { ArtistAutocomplete } from "../ArtistAutocomplete"

jest.mock("hooks", () => ({
  useGravity: (url: string) => mockGravityResponse(url),
}))

beforeEach(() => {
  mockGravityResponse.mockClear()
})

it("renders an autocomplete input`", () => {
  render(<ArtistAutocomplete />)

  expect(screen.getByPlaceholderText("Artist name")).toBeInTheDocument()
})

it("fetches via useGravity on each keystroke", async () => {
  render(<ArtistAutocomplete />)

  const autocompleteInput = screen.getByPlaceholderText("Artist name")
  fireEvent.change(autocompleteInput, { target: { value: "b" } })
  expect(screen.getByText("Cardi B")).toBeInTheDocument()
  fireEvent.change(autocompleteInput, { target: { value: "ba" } })
  expect(screen.getByText("Omar Ba")).toBeInTheDocument()

  expect(mockGravityResponse).toHaveBeenCalledTimes(3)
})

it("invokes the supplied onSelect handler when an option is chosen", async () => {
  const handleSelect = jest.fn()
  render(<ArtistAutocomplete onSelect={handleSelect} />)

  const autocompleteInput = screen.getByPlaceholderText("Artist name")
  fireEvent.change(autocompleteInput, { target: { value: "b" } })
  fireEvent.mouseDown(screen.getByText("Cardi B"))

  expect(handleSelect).toHaveBeenCalled()
})

/**
 * stub requests to Gravity's artist matcher endpoint:
 *
 * /api/v1/match/artists?term=foo
 */

const mockGravityResponse = jest.fn((url: string) => {
  if (url.endsWith("term=")) return { data: [] }

  if (url.endsWith("term=b"))
    return { data: [{ name: "Cardi B" }, { name: "Mel B" }] }

  if (url.endsWith("term=ba"))
    return { data: [{ name: "Omar Ba" }, { name: "Karl Ba" }] }

  throw new Error(`Unexpected term: ${url}`)
})

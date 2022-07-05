import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"

import { UserAutocomplete } from "../UserAutocomplete"

jest.mock("hooks", () => ({
  useGravity: (url: string) => mockGravityResponse(url),
}))

beforeEach(() => {
  mockGravityResponse.mockClear()
})

it("renders an autocomplete input`", () => {
  render(<UserAutocomplete />)

  expect(screen.getByPlaceholderText("User name or email")).toBeInTheDocument()
})

it("fetches via useGravity on each keystroke", async () => {
  render(<UserAutocomplete />)

  const autocompleteInput = screen.getByPlaceholderText("User name or email")
  fireEvent.change(autocompleteInput, { target: { value: "b" } })
  expect(screen.getByText("Cardi B")).toBeInTheDocument()
  fireEvent.change(autocompleteInput, { target: { value: "ba" } })
  expect(screen.getByText("Omar Ba")).toBeInTheDocument()

  expect(mockGravityResponse).toHaveBeenCalledTimes(3)
})

it("invokes the supplied onSelect handler when an option is chosen", async () => {
  const handleSelect = jest.fn()
  render(<UserAutocomplete onSelect={handleSelect} />)

  const autocompleteInput = screen.getByPlaceholderText("User name or email")
  fireEvent.change(autocompleteInput, { target: { value: "b" } })
  fireEvent.mouseDown(screen.getByText("Cardi B"))

  expect(handleSelect).toHaveBeenCalled()
})

it("displays a badge for identity-verified users", async () => {
  render(<UserAutocomplete />)

  const autocompleteInput = screen.getByPlaceholderText("User name or email")
  fireEvent.change(autocompleteInput, { target: { value: "bat" } })

  screen.getByText("Batman")
  expect(screen.getByTestId("identity-verified-badge")).toBeInTheDocument()
})

/**
 * stub requests to Gravity's artist matcher endpoint:
 *
 * /api/v1/match/users?term=foo
 */

const mockGravityResponse = jest.fn((url: string) => {
  if (url.endsWith("term=")) return { data: [] }

  if (url.endsWith("term=b"))
    return {
      data: [{ name: "Cardi B" }, { name: "Mel B" }],
    }

  if (url.endsWith("term=ba"))
    return {
      data: [{ name: "Omar Ba" }, { name: "Karl Ba" }],
    }

  if (url.endsWith("term=bat"))
    return {
      data: [{ name: "Batman", identity_verified: true }],
    }

  throw new Error(`Unexpected term: ${url}`)
})

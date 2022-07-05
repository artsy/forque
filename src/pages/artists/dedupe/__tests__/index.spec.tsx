import { screen } from "@testing-library/react"
import { Role } from "system"
import { renderWithRoles } from "test-utils"
import Page from "../index.page"

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {},
}))

jest.mock("hooks", () => ({
  useMetaphysics: () => ({}),
  useGravity: () => ({ data: [] }),
}))

it("renders an autocomplete for selecting an artist", () => {
  renderWithRoles(<Page />, [Role.metadata_admin])

  expect(screen.getByText(/Choose an artist record/)).toBeInTheDocument()
  expect(screen.getByPlaceholderText("Artist name")).toBeInTheDocument()
})

it("renders a list of recent artists", () => {
  renderWithRoles(<Page />, [Role.metadata_admin])

  expect(
    screen.getByText(/choose from the following recent artists/)
  ).toBeInTheDocument()
})

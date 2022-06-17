import { render, screen } from "@testing-library/react"
import { VerificationsDetails } from "../VerificationsDetails"
import { overrides, scanReferences } from "../__fixtures__/verifications"

xit("shows verifications", () => {
  // pending relay testing support
})

it("shows verifications details", () => {
  render(
    <VerificationsDetails
      scanReferences={scanReferences}
      overrides={overrides}
    />
  )
  expect(screen.getByText("Scan References")).toBeInTheDocument()
  expect(screen.getByText("joe")).toBeInTheDocument()
  expect(screen.getByText("Overrides")).toBeInTheDocument()
  expect(screen.getByText("admin@foo.com")).toBeInTheDocument()
})

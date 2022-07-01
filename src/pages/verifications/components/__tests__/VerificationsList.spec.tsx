// import { render, screen } from "@testing-library/react"
// import { VerificationsDetails } from "../VerificationsDetails"
// import { identityVerification } from "../__fixtures__/verifications"
import { verificationOverrideSucessResponse } from "../__fixtures__/verificationOverrideCreateMutationResponse"

xit("shows verifications", () => {
  // pending relay testing support
})

const mockCreateIdentityVerificationOverride = jest.fn()

jest.mock("../../mutations/useCreateIdentityVerificationOverride", () => ({
  useCreateIdentityVerificationOverride: () => ({
    submitMutation: mockCreateIdentityVerificationOverride,
  }),
}))

it("shows verifications details", () => {
  mockCreateIdentityVerificationOverride.mockImplementation(
    () => verificationOverrideSucessResponse
  )
  // render(
  //   <VerificationsDetails
  //     identityVerificationScanReferences={identityVerification}
  //     identityVerificationOverrides={identityVerification}
  //   />
  // )
  // expect(screen.getByText("Scan References")).toBeInTheDocument()
  // expect(screen.getByText("joe")).toBeInTheDocument()
  // expect(screen.getByText("Overrides")).toBeInTheDocument()
  // expect(screen.getByText("admin@foo.com")).toBeInTheDocument()
})

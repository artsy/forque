import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { VerificationsOverridesCreate } from "../VerificationsOverridesCreate"
import { verificationOverrideSucessResponse } from "../__fixtures__/verificationOverrideCreateMutationResponse"

const mockSendToast = jest.fn()

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useToasts: () => ({
    sendToast: mockSendToast,
  }),
}))

const mockCreateIdentityVerificationOverride = jest.fn()

jest.mock("../../mutations/useCreateIdentityVerificationOverride", () => ({
  useCreateIdentityVerificationOverride: () => ({
    submitMutation: mockCreateIdentityVerificationOverride,
  }),
}))

afterEach(() => {
  mockSendToast.mockClear()
  mockCreateIdentityVerificationOverride.mockClear()
})

it("shows a toast message when an identity verfication is created", async () => {
  mockCreateIdentityVerificationOverride.mockImplementation(
    () => verificationOverrideSucessResponse
  )

  render(<VerificationsOverridesCreate identityVerificationID="blah" />)

  const stateInput = screen.getByPlaceholderText("Select State")
  fireEvent.change(stateInput, { target: { value: "passed" } })

  const reasonInput = screen.getByPlaceholderText("Reason")
  fireEvent.change(reasonInput, { target: { value: "its a cat" } })

  fireEvent.click(screen.getByRole("button"))

  await waitFor(() =>
    expect(mockSendToast).toHaveBeenCalledWith({
      variant: "success",
      message: "Identity verification override created",
    })
  )
})

it("sends the correct input with the mutation", async () => {
  mockCreateIdentityVerificationOverride.mockImplementation(
    () => verificationOverrideSucessResponse
  )

  render(<VerificationsOverridesCreate identityVerificationID="blah" />)

  const stateInput = screen.getByPlaceholderText("Select State")
  fireEvent.change(stateInput, { target: { value: "passed" } })

  const reasonInput = screen.getByPlaceholderText("Reason")
  fireEvent.change(reasonInput, { target: { value: "its a cat" } })

  fireEvent.click(screen.getByRole("button"))

  await waitFor(() =>
    expect(mockCreateIdentityVerificationOverride).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            identityVerificationID: "blah",
            reason: "its a cat",
            state: "passed",
          },
        },
      })
    )
  )
})

it("shows a toast message when an identity verification fails to be created", async () => {
  mockCreateIdentityVerificationOverride.mockImplementation(() => {
    throw new Error("cats in the server room")
  })

  render(<VerificationsOverridesCreate identityVerificationID="blah" />)

  const stateInput = screen.getByPlaceholderText("Select State")
  fireEvent.change(stateInput, { target: { value: "passed" } })

  const reasonInput = screen.getByPlaceholderText("Reason")
  fireEvent.change(reasonInput, { target: { value: "its a cat" } })

  fireEvent.click(screen.getByRole("button"))

  await waitFor(() =>
    expect(mockSendToast).toHaveBeenCalledWith({
      variant: "error",
      message: "There was an error creating an identity verification override",
    })
  )
})

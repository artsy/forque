import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { VarificationCreate } from "../VerificationCreate"
import {
  successResponse,
  failureResponse,
} from "../__fixtures__/verificationCreateMutationResponses"

const mockSendToast = jest.fn()

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useToasts: () => ({
    sendToast: mockSendToast,
  }),
}))

const mockCreateIdentityVerification = jest.fn()

jest.mock("../../mutations/useCreateIdentityVerification", () => ({
  useCreateIdentityVerification: () => ({
    submitMutation: mockCreateIdentityVerification,
  }),
}))

it("shows a toast message when an identity verfication is created", async () => {
  mockCreateIdentityVerification.mockImplementation(() => successResponse)

  render(<VarificationCreate />)

  const input = screen.getByPlaceholderText("user@example.com")

  fireEvent.change(input, { target: { value: "human@user.com" } })

  fireEvent.click(screen.getByRole("button"))

  await waitFor(() =>
    expect(mockSendToast).toHaveBeenCalledWith({
      variant: "success",
      message: "Identity verification created",
    })
  )
})

xit("shows a toast message when an identity verification fails to be created", async () => {
  mockCreateIdentityVerification.mockImplementation(() => failureResponse)

  render(<VarificationCreate />)

  const input = screen.getByPlaceholderText("user@example.com")

  fireEvent.change(input, { target: { value: "human@user.com" } })

  fireEvent.click(screen.getByRole("button"))

  await waitFor(() =>
    expect(mockSendToast).toHaveBeenCalledWith({
      variant: "error",
      message: "There was an error creating the identity verification",
    })
  )
})

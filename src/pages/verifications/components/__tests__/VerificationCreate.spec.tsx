import { fireEvent, render, screen } from "@testing-library/react"
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

it("shows a confirmation message when an identity verfication is created", async () => {
  mockCreateIdentityVerification.mockImplementation(() => successResponse)

  const spy = jest.fn()
  mockSendToast.mockImplementation(() => spy)

  render(<VarificationCreate />)

  const input = screen.getByPlaceholderText("user@example.com")

  fireEvent.change(input, { target: { value: "human@user.com" } })

  fireEvent.click(screen.getByRole("button"))

  expect(spy).toHaveBeenCalledWith({
    variant: "success",
    message: "Identity verification created",
  })
})

it("shows a confirmation message when an identity verification fails to be created", () => {
  mockCreateIdentityVerification.mockImplementation(() => failureResponse)

  const spy = jest.fn()
  mockSendToast.mockImplementation(() => ({
    sendToast: spy,
  }))

  render(<VarificationCreate />)

  const input = screen.getByPlaceholderText("user@example.com")

  fireEvent.change(input, { target: { value: "human@user.com" } })

  fireEvent.click(screen.getByRole("button"))

  expect(spy).toHaveBeenCalledWith({
    variant: "error",
    message: "There was an error creating the identity verification",
  })
})

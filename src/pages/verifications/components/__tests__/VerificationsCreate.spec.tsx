import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { VerificationsCreate } from "../VerificationsCreate"
import { successResponse } from "../__fixtures__/verificationCreateMutationResponses"

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

afterEach(() => {
  mockSendToast.mockClear()
  mockCreateIdentityVerification.mockClear()
})

it("shows a toast message when an identity verfication is created", async () => {
  mockCreateIdentityVerification.mockImplementation(() => successResponse)

  render(<VerificationsCreate />)

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

it("sends the correct input with the mutation", async () => {
  mockCreateIdentityVerification.mockImplementation(() => successResponse)

  render(<VerificationsCreate />)

  const emailInput = screen.getByPlaceholderText("user@example.com")
  const nameInput = screen.getByPlaceholderText("Jane Doe")

  fireEvent.change(emailInput, { target: { value: "human@user.com" } })
  fireEvent.change(nameInput, { target: { value: "Human Person" } })

  fireEvent.click(screen.getByRole("button"))

  await waitFor(() =>
    expect(mockCreateIdentityVerification).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            email: "human@user.com",
            name: "Human Person",
          },
        },
      })
    )
  )
})

it("shows a toast message when an identity verification fails to be created", async () => {
  mockCreateIdentityVerification.mockImplementation(() => {
    throw new Error("cats in the server room")
  })

  render(<VerificationsCreate />)

  const input = screen.getByPlaceholderText("user@example.com")

  fireEvent.change(input, { target: { value: "human@user.com" } })

  fireEvent.click(screen.getByRole("button"))

  await waitFor(() =>
    expect(mockSendToast).toHaveBeenCalledWith({
      variant: "error",
      message: "There was an error creating the identity verification",
      description: "cats in the server room",
    })
  )
})

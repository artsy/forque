import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { CreateOrEditShortcutForm } from "../CreateOrEditShortcutForm"

jest.mock("next-auth/react", () => ({
  useSession: () => {
    return {
      data: {
        user: {
          accessToken: "abc123",
        },
      },
    }
  },
}))

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    NEXT_PUBLIC_GRAVITY_URL: "https://stagingapi.artsy.net",
  },
}))

describe("CreateOrEditShortcutForm", () => {
  it("renders the form with all Input fields", () => {
    render(<CreateOrEditShortcutForm isEditContext={false} />)

    expect(screen.getByText(/artsy.net\//)).toBeInTheDocument()
    expect(screen.getByText(/Redirects to/)).toBeInTheDocument()

    userEvent.click(screen.getByTestId("utmCheckbox"))

    expect(screen.getByText("Source")).toBeInTheDocument()
    expect(screen.getByText("Medium")).toBeInTheDocument()
    expect(screen.getByText("Campaign")).toBeInTheDocument()
    expect(screen.getByText("Content")).toBeInTheDocument()
    expect(screen.getByText("Term")).toBeInTheDocument()
  })
})

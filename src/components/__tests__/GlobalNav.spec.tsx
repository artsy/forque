import React from "react"
import { render, screen } from "@testing-library/react"

import { GlobalNav } from "../GlobalNav"

jest.mock("next/router", () => ({ useRouter: () => ({ pathname: "/" }) }))

describe("logged-out user", () => {
  it("renders a login option ", () => {
    const user = undefined

    render(<GlobalNav user={user} />)

    expect(screen.getByRole("link", { name: "Login" })).toBeVisible()
  })
})

describe("logged-in user", () => {
  it("renders a logout option ", () => {
    const user = {
      id: "fake",
      email: "fake@artsymail.com",
      accessToken: "fake",
    }

    render(<GlobalNav user={user} />)

    expect(screen.getByRole("link", { name: "Logout" })).toBeVisible()
  })
})

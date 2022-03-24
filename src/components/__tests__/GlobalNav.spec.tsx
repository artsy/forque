import React from "react"
import { render, screen } from "@testing-library/react"

import { GlobalNav } from "../GlobalNav"

describe("logged-out user", () => {
  it("renders a login option ", () => {
    const user = null

    render(<GlobalNav user={user} />)

    expect(screen.getByRole("link", { name: "Login" })).toBeVisible()
  })
})

describe("logged-in user", () => {
  it("renders a logout option ", () => {
    const user = { email: "fake@artsymail.com" }

    render(<GlobalNav user={user} />)

    expect(screen.getByRole("link", { name: "Logout" })).toBeVisible()
  })
})

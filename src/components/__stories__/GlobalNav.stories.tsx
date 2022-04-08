import React from "react"
import { GlobalNav } from "../GlobalNav"

export default {
  component: GlobalNav,
}

export const LoggedOut = () => <GlobalNav />
export const LoggedIn = () => (
  <GlobalNav
    user={{ id: "fake", email: "fake@artsy.net", accessToken: "fake" }}
  />
)

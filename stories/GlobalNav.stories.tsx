import React from "react"
import { GlobalNav } from "../components/GlobalNav"

export default {
  component: GlobalNav,
}

export const LoggedOut = () => <GlobalNav user={null} />
export const LoggedIn = () => <GlobalNav user={{ email: "fake@artsy.net" }} />
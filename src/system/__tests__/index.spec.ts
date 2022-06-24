import {
  isPermitted,
  Action,
  UserWithAccessToken,
  buildPermittedRoles,
} from "system"

const user: UserWithAccessToken = {
  id: "fake",
  email: "fake@artsy.net",
  accessToken: "fake",
  roles: [],
}

describe("isPermitted WITHOUT an action argument", () => {
  it("rejects unauthorized user", () => {
    ;(user.roles = ["genomer"]),
      expect(isPermitted(user, "artists")).toEqual(false)
  })

  it("permits authorized user", () => {
    user.roles = ["metadata_admin"]
    expect(isPermitted(user, "artists")).toEqual(true)
  })
})

describe("isPermitted WITH an action argument", () => {
  it("returns true when user roles permit the action", () => {
    user.roles = ["content_manager", "admin", "team"]
    expect(isPermitted(user, "artists", Action.transfer)).toEqual(true)
  })

  it("returns false when user roles don't permit the action", () => {
    user.roles = ["metadata_admin"]
    expect(isPermitted(user, "artists", Action.transfer)).toEqual(false)
  })
})

describe("buildPermittedRoles", () => {
  it("returns an array of all permitted roles for a domain", () => {
    expect(buildPermittedRoles("artists")).toEqual(["metadata_admin", "team"])
  })
})

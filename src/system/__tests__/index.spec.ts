import { isPermitted, Action, UserWithAccessToken } from "system"

const basicUser: UserWithAccessToken = {
  id: "fake",
  email: "fake@artsy.net",
  accessToken: "fake",
  roles: [],
}

describe("isPermitted", () => {
  it("rejects unauthorized user", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["genomer"],
    }
    expect(isPermitted(user, [Action.list], "artists")).toEqual(false)
  })

  it("permits authorized user", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["metadata_admin"],
    }
    expect(isPermitted(user, [Action.list], "artists")).toEqual(true)
  })

  it("permits user who is authorized for any of the specified actions", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["metadata_admin"],
    }
    expect(isPermitted(user, [Action.list, Action.create], "artists")).toEqual(
      true
    )
  })

  it("rejects unrecognized action", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["metadata_admin"],
    }
    expect(isPermitted(user, [Action.transfer], "artists")).toEqual(false)
  })
})

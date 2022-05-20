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
    expect(isPermitted(user, "artists")).toEqual(false)
  })

  it("permits authorized user", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["metadata_admin"],
    }
    expect(isPermitted(user, "artists")).toEqual(true)
  })

  it("permits user who is authorized for any action", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["metadata_admin"],
    }
    expect(isPermitted(user, "artists")).toEqual(true)
  })

  it("rejects unrecognized action", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["metadata_admin"],
    }
    expect(isPermitted(user, "artists", Action.transfer)).toEqual(false)
  })

  it("permits user who is has permission for a certain action", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["content_manager", "team"],
    }
    expect(isPermitted(user, "artists", Action.transfer)).toEqual(true)
  })
})

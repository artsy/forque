import {
  isPermittedAccess,
  Action,
  UserWithAccessToken,
  isPermittedAction,
} from "system"

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
    expect(isPermittedAccess(user, "artists")).toEqual(false)
  })

  it("permits authorized user", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["metadata_admin"],
    }
    expect(isPermittedAccess(user, "artists")).toEqual(true)
  })
})

describe("isPermittedAction", () => {
  it("returns true when user roles permit the action", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["team"],
    }
    expect(isPermittedAction(user, "artists", Action.transfer)).toEqual(true)
  })

  it("rejects unrecognized action", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["metadata_admin"],
    }
    expect(isPermittedAction(user, "artists", Action.transfer)).toEqual(false)
  })

  it("permits user who is has permission for a certain action", () => {
    const user: UserWithAccessToken = {
      ...basicUser,
      roles: ["content_manager", "team"],
    }
    expect(isPermittedAction(user, "artists", Action.transfer)).toEqual(true)
  })
})

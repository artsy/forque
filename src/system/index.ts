import type { User } from "next-auth"

export type UserWithAccessToken = User & {
  accessToken: string
  roles: string[]
}

// all supported roles
export enum Role {
  customer_support = "customer_support",
  metadata_admin = "metadata_admin",
  team = "team",
}

export enum Action {
  list,
  dedupe,
  create,
  transfer,
}

// For each _domain_, a map of _actions_ to the authorized _roles_.
const PERMISSIONS: Record<string, Record<string, Role[]>> = {
  users: {
    [Action.list]: [Role.customer_support],
  },
  artists: {
    [Action.dedupe]: [Role.metadata_admin],
    [Action.list]: [Role.metadata_admin],
  },
  my_collection: {
    [Action.transfer]: [Role.customer_support],
  },
  uploads: {
    [Action.list]: [Role.team],
    [Action.create]: [Role.team],
  },
}

type Domain = keyof typeof PERMISSIONS

export const isPermitted = (
  user: UserWithAccessToken,
  actions: Action[],
  domain: Domain
) => {
  return actions.some((action) => {
    const permittedRoles = PERMISSIONS[domain][action] || []
    return permittedRoles.some((permittedRole) =>
      user.roles.includes(`${permittedRole}`)
    )
  })
}

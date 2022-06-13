import type { User } from "next-auth"

export type UserWithAccessToken = User & {
  accessToken: string
  roles: string[]
}

// All supported roles
// NOTE: Do not add Admin to supported roles. It is to be deprectated.
export enum Role {
  customer_support = "customer_support",
  metadata_admin = "metadata_admin",
  team = "team",
  content_manager = "content_manager",
}

export enum Action {
  list,
  dedupe,
  create,
  transfer,
  edit,
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
  shortcuts: {
    [Action.create]: [Role.content_manager],
    [Action.edit]: [Role.content_manager],
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

export const assertPermitted = (
  user: UserWithAccessToken,
  action: Action,
  domain: Domain
) => {
  if (!isPermitted(user, [action], domain)) {
    const permittedRoles = PERMISSIONS[domain][action] || []
    const message = `Unauthorized: ${domain} (${
      Action[action]
    }) requires roles: ${permittedRoles.join(
      ", "
    )}. Please contact your product team for assistance.`
    throw new Error(message)
  }
}

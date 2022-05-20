import type { User } from "next-auth"

export type UserWithAccessToken = User & {
  accessToken: string
  roles: string[]
}

// all supported roles
// NOTE: Do not add Admin to supported roles. It is to be deprectated.
export enum Role {
  customerSupport = "customer_support",
  metadataAdmin = "metadata_admin",
  team = "team",
  contentManager = "content_manager",
}

export enum Action {
  list = "list",
  dedupe = "dedup",
  create = "create",
  transfer = "tranfer",
  edit = "edit",
}

// For each _domain_, a map of _actions_ to the authorized _roles_.
const PERMISSIONS: Record<string, Record<string, Role[]>> = {
  users: {
    [Action.list]: [Role.customerSupport],
  },
  artists: {
    [Action.dedupe]: [Role.metadataAdmin],
    [Action.list]: [Role.metadataAdmin],
    [Action.transfer]: [Role.team],
  },
  my_collection: {
    [Action.transfer]: [Role.customerSupport],
  },
  uploads: {
    [Action.list]: [Role.team],
    [Action.create]: [Role.team],
  },
  shortcuts: {
    [Action.create]: [Role.contentManager],
    [Action.edit]: [Role.contentManager],
  },
}

type Domain = keyof typeof PERMISSIONS

export const isPermitted = (
  user: UserWithAccessToken,
  domain: Domain,
  action?: Action
): boolean => {
  const actionPermittedByrole = (action: Action, role: Role): boolean => {
    return PERMISSIONS[domain][action].includes(role)
  }

  return user.roles.some((role) => {
    if (action) return actionPermittedByrole(action, role)

    for (const actionEnum in PERMISSIONS[domain]) {
      if (actionPermittedByrole(actionEnum, role)) return true
    }
    return false
  })
}

export const assertPermitted = (
  user: UserWithAccessToken,
  domain: Domain,
  action?: Action
) => {
  if (!isPermitted(user, domain, action)) {
    const permittedRoles = buildPermittedRoles(domain)

    const message = `Unauthorized: ${domain} requires role(s): ${permittedRoles.join(
      ", "
    )}. Please contact your product team for assistance.`
    throw new Error(message)
  }
}

const buildPermittedRoles = (domain: Domain): [string] => {
  const approvedRoles = []

  for (const action in PERMISSIONS[domain]) {
    PERMISSIONS[domain][action].forEach((role) => {
      if (!approvedRoles.includes(role)) approvedRoles.push(role)
    })
  }

  return approvedRoles
}

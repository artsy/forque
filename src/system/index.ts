import type { User } from "next-auth"

export type UserWithAccessToken = User & {
  accessToken: string
  roles: string[]
}

// all supported roles
// NOTE: Do not add Admin to supported roles. It is to be deprectated.
export enum Role {
  customer_support = "customer_support",
  metadata_admin = "metadata_admin",
  team = "team",
  content_manager = "content_manager",
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
    [Action.list]: [Role.customer_support],
  },
  artists: {
    [Action.dedupe]: [Role.metadata_admin],
    [Action.list]: [Role.metadata_admin],
    [Action.transfer]: [Role.team],
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

export const isPermittedAccess = (
  user: UserWithAccessToken,
  domain: Domain
): boolean => {
  return user.roles.some((role) => {
    for (const actionEnum in PERMISSIONS[domain]) {
      if (actionPermittedByRole(domain, actionEnum, role)) return true
    }
    return false
  })
}

export const assertPermittedAccess = (
  user: UserWithAccessToken,
  domain: Domain
) => {
  if (!isPermittedAccess(user, domain)) {
    const permittedRoles = buildPermittedRoles(domain)

    const message = `Unauthorized: ${domain} requires role(s): ${permittedRoles.join(
      ", "
    )}. Please contact your product team for assistance.`

    throw new Error(message)
  }
}

export const isPermittedAction = (
  user: UserWithAccessToken,
  domain: Domain,
  action: Action
): boolean => {
  return user.roles.some((role) => {
    return actionPermittedByRole(domain, action, role)
  })
}

// helpers

const buildPermittedRoles = (domain: Domain): string[] => {
  const approvedRoles: string[] = []

  for (const action in PERMISSIONS[domain]) {
    PERMISSIONS[domain][action].forEach((role) => {
      if (!approvedRoles.includes(role)) approvedRoles.push(role)
    })
  }

  return approvedRoles
}

const actionPermittedByRole = (
  domain: string,
  action: string,
  userRole: string
): boolean => {
  let userPermittedByRoles = false

  PERMISSIONS[domain][action].forEach((permittedRole) => {
    if (userRole == permittedRole) {
      userPermittedByRoles = true
    }
  })

  return userPermittedByRoles
}

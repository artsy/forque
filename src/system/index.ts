import type { User } from "next-auth"

export type UserWithAccessToken = User & {
  accessToken: string
  roles: string[]
}

// all supported roles
export enum Role {
  // NOTE: Do not add Admin to supported roles. It is to be deprecated.
  customer_support = "customer_support",
  metadata_admin = "metadata_admin",
  team = "team",
  content_manager = "content_manager",
  verification_admin = "verification_admin",
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
  artists: {
    [Action.dedupe]: [Role.metadata_admin],
    [Action.list]: [Role.metadata_admin],
    [Action.transfer]: [Role.team],
  },
  // TODO: We need to follow up and narrow the role to something less than
  // `team`. Perhaps we can use `product_development`.
  feature_flags: {
    [Action.list]: [Role.team],
    [Action.create]: [Role.team],
  },
  my_collection: {
    [Action.transfer]: [Role.customer_support],
  },
  shortcuts: {
    [Action.create]: [Role.content_manager],
    [Action.edit]: [Role.content_manager],
  },
  uploads: {
    [Action.list]: [Role.team],
    [Action.create]: [Role.team],
  },
  users: {
    [Action.list]: [Role.customer_support],
  },
  verifications: {
    [Action.create]: [Role.verification_admin],
    [Action.list]: [Role.metadata_admin],
  },
}

type Domain = keyof typeof PERMISSIONS

export const isPermitted = (
  user: UserWithAccessToken,
  domain: Domain,
  action?: Action
): boolean => {
  if (action) {
    return user.roles.some((role) => {
      return actionPermittedByRole(domain, action, role)
    })
  } else {
    return user.roles.some((role) => {
      for (const action in PERMISSIONS[domain]) {
        if (actionPermittedByRole(domain, action, role)) return true
      }
      return false
    })
  }
}

export const assertPermitted = (user: UserWithAccessToken, domain: Domain) => {
  if (!isPermitted(user, domain)) {
    const permittedRoles = buildPermittedRoles(domain)

    const message = `Unauthorized: ${domain} requires role(s): ${permittedRoles.join(
      ", "
    )}. Please contact your product team for assistance.`

    throw new Error(message)
  }
}

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

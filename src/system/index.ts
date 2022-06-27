import type { User } from "next-auth"
import { intersection, uniq } from "lodash"

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
  dedupe = "dedupe",
  create = "create",
  transfer = "transfer",
  edit = "edit",
}

// For each _domain_, a map of _actions_ to the authorized _roles_.
const PERMISSIONS: Record<string, Record<string, Role[]>> = {
  artists: {
    [Action.dedupe]: [Role.metadata_admin],
    [Action.list]: [Role.metadata_admin],
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
    [Action.list]: [Role.verification_admin],
  },
}

type Domain = keyof typeof PERMISSIONS

export const isPermitted = (
  user: UserWithAccessToken,
  domain: Domain,
  action?: Action
): boolean => {
  const permittedRoles = action
    ? PERMISSIONS[domain][action]
    : flattenedArray(domain)

  return intersection(user.roles, permittedRoles).length > 0
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

export const buildPermittedRoles = (domain: Domain): string[] => {
  const permittedRoles = flattenedArray(domain)
  return uniq(permittedRoles)
}

const flattenedArray = (domain: Domain) => {
  // Flattend Array of ALL roles permitted to perform ANY action in the domain
  return Object.values(PERMISSIONS[domain]).reduce(
    (previous, next) => previous.concat(next),
    []
  )
}

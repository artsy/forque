import { FragmentRefs } from "relay-runtime"

/** Typical attributes for Scan References in the list view. */
export type ScanReference = {
  createdAt: string | null
  extractedFirstName: string | null
  extractedLastName: string | null
  extractedIdFailReason: string | null
  extractedSimilarityFailReason: string | null
  finishedAt: string | null
  id: string | null
  internalID: string | null
  jumioID: string | null
  result: string | null
}

/** Typical attributes for Overrides in the list view. */
export type Override = {
  createdAt: string | null
  newState: string | null
  oldState: string | null
  reason: string | null
  userID: string | null
  creator: {
    email: string | null
  }
}

export type IdentityVerification = {
  createdAt: string | null
  email: string | null
  internalID: string
  name: string | null
  state: string
  userID: string | null
  " $fragmentSpreads": FragmentRefs<
    | "VerificationsScanReferences_identityVerification"
    | "VerificationsOverrides_identityVerification"
  >
}

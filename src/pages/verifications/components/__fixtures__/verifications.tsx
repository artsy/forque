import type { Override, ScanReference, IdentityVerification } from "../types"

export const identityVerificationID = "identityVerificationID"

export const overrides: Override[] = [
  {
    createdAt: "just now",
    newState: "passed",
    oldState: "failed",
    reason: "yolo",
    userID: "123",
    creator: {
      email: "admin@foo.com",
    },
  },
]

export const scanReferences: ScanReference[] = [
  {
    createdAt: "long time ago",
    extractedFirstName: "joe",
    extractedLastName: "plumber",
    extractedIdFailReason: null,
    extractedSimilarityFailReason: null,
    finishedAt: "just now",
    id: "123",
    internalID: "456",
    jumioID: "789",
    result: "passed",
  },
]

export const identityVerification: IdentityVerification = {
  createdAt: "long time ago",
  email: "admin@foo.com",
  internalID: "456",
  name: "joe plumber",
  state: "pending",
  userID: "123",
  " $fragmentSpreads": {
    VerificationsOverrides_identityVerification: true,
    VerificationsScanReferences_identityVerification: true,
  },
}

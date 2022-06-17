import type { Override, ScanReference } from "../types"

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

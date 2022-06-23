export const verificationOverrideSucessResponse = {
  createIdentityVerificationOverrideResponseOrError: {
    __typename: "IdentityVerificationOverrideMutationSuccess",
    identityVerificationOverride: {
      userID: "123",
      reason: "testing",
      newState: "failed",
      oldState: "pending",
    },
  },
}

export const verificationOverrideFailureResponse = {
  createIdentityVerificationOverrideResponseOrError: {
    __typename: "IdentityVerificationOverrideMutationFailure",
    mutationError: {
      message: "Not Found",
    },
  },
}

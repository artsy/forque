export const verificationOverrideSucessResponse = {
  createIdentityVerificationOverrideResponseOrError: {
    __typename: "IdentityVerificationOverrideMutationSuccess",
    identityVerification: {
      __typename: "IdentityVerification",
      name: "joe plumber",
      internalID: "456",
      state: "passed",
      userID: "123",
      email: "admin@foo.com",
      overrides: [
        {
          userID: "123",
          reason: "testing",
          newState: "failed",
          oldState: "pending",
        },
      ],
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

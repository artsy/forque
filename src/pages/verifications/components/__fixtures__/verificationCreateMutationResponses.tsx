export const successResponse = {
  sendIdentityVerificationEmail: {
    confirmationOrError: {
      identityVerificationEmail: {
        internalID: "123",
      },
    },
  },
}

export const failureResponse = {
  sendIdentityVerificationEmail: {
    confirmationOrError: {
      mutationError: {
        message: "something went wrong",
      },
    },
  },
}

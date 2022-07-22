import { useMutation } from "hooks"
import { graphql } from "react-relay"
import { useCreateIdentityVerificationMutation } from "__generated__/useCreateIdentityVerificationMutation.graphql"

export const useCreateIdentityVerification = () => {
  return useMutation<useCreateIdentityVerificationMutation>({
    mutation: graphql`
      mutation useCreateIdentityVerificationMutation(
        $input: SendIdentityVerificationEmailMutationInput!
      ) {
        sendIdentityVerificationEmail(input: $input) {
          clientMutationId
          confirmationOrError {
            ... on IdentityVerificationEmailMutationSuccessType {
              identityVerification {
                pageURL
              }
            }

            ... on IdentityVerificationEmailMutationFailureType {
              mutationError {
                error
                message
              }
            }
          }
        }
      }
    `,
  })
}

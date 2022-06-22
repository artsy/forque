import { useMutation } from "hooks"
import { graphql } from "react-relay"
import { useCreateIdentityVerificationOverrideMutation } from "__generated__/useCreateIdentityVerificationOverrideMutation.graphql"

export const useCreateIdentityVerificationOverride = () => {
  return useMutation<useCreateIdentityVerificationOverrideMutation>({
    mutation: graphql`
      mutation useCreateIdentityVerificationOverrideMutation(
        $input: CreateIdentityVerificationOverrideMutationInput!
      ) {
        createIdentityVerificationOverride(input: $input) {
          createIdentityVerificationOverrideResponseOrError {
            ... on IdentityVerificationOverrideMutationSuccess {
              identityVerificationOverride {
                userID
                reason
                newState
                oldState
                createdAt
              }
            }
            ... on IdentityVerificationOverrideMutationFailure {
              mutationError {
                message
              }
            }
          }
        }
      }
    `,
  })
}

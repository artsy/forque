import { useMutation } from "hooks/useMutation"
import { graphql } from "react-relay"
import { useUpdateUserMutation } from "__generated__/useUpdateUserMutation.graphql"

export const useUpdateUser = () => {
  return useMutation<useUpdateUserMutation>({
    mutation: graphql`
      mutation useUpdateUserMutation($input: UpdateUserMutationInput!) {
        updateUser(input: $input) {
          clientMutationId
        }
      }
    `,
  })
}

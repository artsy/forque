import { useMutation } from "hooks/useMutation"
import { graphql } from "react-relay"
import { useUpdateUserSaleProfileMutation } from "__generated__/useUpdateUserSaleProfileMutation.graphql"

export const useUpdateUserSaleProfile = () => {
  return useMutation<useUpdateUserSaleProfileMutation>({
    mutation: graphql`
      mutation useUpdateUserSaleProfileMutation(
        $input: UpdateUserSaleProfileMutationInput!
      ) {
        updateUserSaleProfile(input: $input) {
          clientMutationId
        }
      }
    `,
  })
}

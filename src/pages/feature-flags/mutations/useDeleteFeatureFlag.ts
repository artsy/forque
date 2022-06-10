import { useMutation } from "hooks"
import { graphql } from "react-relay"
import { useDeleteFeatureFlagMutation } from "__generated__/useDeleteFeatureFlagMutation.graphql"

export const useDeleteFeatureFlag = () => {
  return useMutation<useDeleteFeatureFlagMutation>({
    mutation: graphql`
      mutation useDeleteFeatureFlagMutation(
        $input: AdminDeleteFeatureFlagInput!
      ) {
        adminDeleteFeatureFlag(input: $input) {
          success
        }
      }
    `,
  })
}

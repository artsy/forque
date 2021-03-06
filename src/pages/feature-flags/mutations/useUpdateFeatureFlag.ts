import { useMutation } from "hooks"
import { graphql } from "react-relay"
import { useUpdateFeatureFlagMutation } from "__generated__/useUpdateFeatureFlagMutation.graphql"

export const useUpdateFeatureFlag = () => {
  return useMutation<useUpdateFeatureFlagMutation>({
    mutation: graphql`
      mutation useUpdateFeatureFlagMutation(
        $input: AdminUpdateFeatureFlagInput!
      ) {
        adminUpdateFeatureFlag(input: $input) {
          featureFlags {
            ...FeatureFlagsTable
          }
        }
      }
    `,
  })
}

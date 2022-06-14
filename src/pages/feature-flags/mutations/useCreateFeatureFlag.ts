import { useMutation } from "hooks"
import { graphql } from "react-relay"
import { useCreateFeatureFlagMutation } from "__generated__/useCreateFeatureFlagMutation.graphql"

export const useCreateFeatureFlag = () => {
  return useMutation<useCreateFeatureFlagMutation>({
    mutation: graphql`
      mutation useCreateFeatureFlagMutation(
        $input: AdminCreateFeatureFlagInput!
      ) {
        adminCreateFeatureFlag(input: $input) {
          featureFlags {
            ...FeatureFlagsTable
          }
        }
      }
    `,
  })
}

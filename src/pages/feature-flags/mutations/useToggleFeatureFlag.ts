import { useMutation } from "hooks"
import { graphql } from "react-relay"
import { useToggleFeatureFlagMutation } from "__generated__/useToggleFeatureFlagMutation.graphql"

export const useToggleFeatureFlag = () => {
  return useMutation<useToggleFeatureFlagMutation>({
    mutation: graphql`
      mutation useToggleFeatureFlagMutation(
        $input: AdminToggleFeatureFlagInput!
      ) {
        adminToggleFeatureFlag(input: $input) {
          featureFlags {
            ...FeatureFlagsTable
          }
        }
      }
    `,
  })
}

import { useMutation } from "hooks"
import { graphql } from "react-relay"
import { useMergeArtistsMutation } from "../../../../__generated__/useMergeArtistsMutation.graphql"

export const useMergeArtists = () => {
  return useMutation<useMergeArtistsMutation>({
    mutation: graphql`
      mutation useMergeArtistsMutation($input: MergeArtistsMutationInput!) {
        mergeArtists(input: $input) {
          mergeArtistsResponseOrError {
            __typename
            ... on MergeArtistsSuccess {
              artist {
                internalID
                slug
                name
              }
            }
            ... on MergeArtistsFailure {
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

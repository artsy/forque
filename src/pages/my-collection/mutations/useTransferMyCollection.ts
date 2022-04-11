import { useMutation } from "hooks/useMutation"
import { graphql } from "react-relay"
import { useTransferMyCollectionMutation } from "__generated__/useTransferMyCollectionMutation.graphql"

export const useTransferMyCollection = () => {
  return useMutation<useTransferMyCollectionMutation>({
    mutation: graphql`
      mutation useTransferMyCollectionMutation(
        $input: TransferMyCollectionInput!
      ) {
        transferMyCollection(input: $input) {
          artworkCountOrError {
            ... on Errors {
              errors {
                message
                path
                data
                code
              }
            }

            ... on TransferMyCollectionSuccess {
              count
            }
          }
        }
      }
    `,
  })
}

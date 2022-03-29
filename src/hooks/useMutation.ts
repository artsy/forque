import {
  commitMutation,
  GraphQLTaggedNode,
  MutationParameters,
} from "relay-runtime"
import { useSystemContext } from "./useSystemContext"

/**
 * Helper hook for writing mutations.
 *
 * @example

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

  And then later, in the file where you're invoking it:

  const { submitMutation } = useUpdateUser()

  const handleSubmit = async () => {
    await submitMutation({
      variables: {
        input: {
          id: user.internalID,
          email: values.email,
        },
      },
      rejectIf: res => {
        return !res.updateUser?.clientMutationId
      },
    })
  }
 *
 *
 */
export const useMutation = <T extends MutationParameters>({
  mutation,
}: {
  mutation: GraphQLTaggedNode
}) => {
  const { relayEnvironment } = useSystemContext()

  const submitMutation = (props: {
    variables: T["variables"]
    rejectIf?: (res: T["response"]) => unknown
  }): Promise<T["response"]> => {
    const { variables = {}, rejectIf } = props

    return new Promise((resolve, reject) => {
      commitMutation<T>(relayEnvironment, {
        mutation,
        variables,
        onError: reject,
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          if (rejectIf?.(res)) {
            reject(rejectIf?.(res))
            return
          }

          resolve(res)
        },
      })
    })
  }

  return { submitMutation }
}

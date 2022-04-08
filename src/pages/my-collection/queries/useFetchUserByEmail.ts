import { fetchQuery, graphql } from "relay-runtime"
import { useEnvironment } from "system/relay"
import { useFetchUserByEmailQuery } from "__generated__/useFetchUserByEmailQuery.graphql"

export const useFetchUserByEmail = () => {
  const environment = useEnvironment()

  return (email: string) =>
    fetchQuery<useFetchUserByEmailQuery>(
      environment,
      graphql`
        query useFetchUserByEmailQuery($email: String!) {
          user(email: $email) {
            internalID
            name
            userAlreadyExists
          }
        }
      `,
      { email }
    ).toPromise()
}

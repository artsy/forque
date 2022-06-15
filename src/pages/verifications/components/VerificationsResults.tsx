import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { VerificationsResultsQuery } from "__generated__/VerificationsResultsQuery.graphql"
import { VerificationsTable } from "./VerificationsTable"

interface VerificationsResultsProps {
  email: string
}

export const VerificationsResults: React.FC<VerificationsResultsProps> = (
  props
) => {
  const email = props.email

  const viewerData = useLazyLoadQuery<VerificationsResultsQuery>(
    graphql`
      query VerificationsResultsQuery($email: String) {
        viewer {
          ...VerificationsTable_viewer
        }
      }
    `,
    { email }
  )

  return (
    <>
      <VerificationsTable viewer={viewerData.viewer!} email={props.email} />
    </>
  )
}

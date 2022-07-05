import { Spacer, Text } from "@artsy/palette"
import { Table } from "components/Table"
import { graphql, useFragment } from "react-relay"
import { VerificationsScanReferences_identityVerification$key } from "__generated__/VerificationsScanReferences_identityVerification.graphql"

interface VerificationsScanReferencesProps {
  data: VerificationsScanReferences_identityVerification$key
}

export const VerificationsScanReferences: React.FC<
  VerificationsScanReferencesProps
> = (props) => {
  const data = useFragment(
    graphql`
      fragment VerificationsScanReferences_identityVerification on IdentityVerification {
        id
        internalID
        scanReferences {
          createdAt
          extractedFirstName
          extractedLastName
          extractedIdFailReason
          extractedSimilarityFailReason
          finishedAt
          id
          internalID
          jumioID
          result
        }
      }
    `,
    props.data
  )

  const onRowClick = () => {
    // do nothing
  }

  return (
    <>
      <Text variant="lg" my={1}>
        Scan References
      </Text>
      <Table
        columns={[
          {
            Header: "ID",
            accessor: "internalID",
          },
          {
            Header: "Jumio ID",
            accessor: "jumioID",
          },
          {
            Header: "Created At",
            accessor: "createdAt",
          },
          {
            Header: "Result",
            accessor: "result",
          },
          {
            Header: "Extracted First Name",
            accessor: "extractedFirstName",
          },
          {
            Header: "Extracted Last Name",
            accessor: "extractedLastName",
          },
          {
            Header: "Finished At",
            accessor: "finishedAt",
          },
          {
            Header: "Extracted Similarity Fail Reason",
            accessor: "extractedSimilarityFailReason",
          },
          {
            Header: "Extracted ID Fail Reason",
            accessor: "extractedIdFailReason",
          },
        ]}
        data={data.scanReferences as any}
        onRowClick={onRowClick}
      />
      <Spacer my={2} />
    </>
  )
}

import { Spacer, Text } from "@artsy/palette"
import { Table } from "components/Table"

export const VerificationsScanReferences: React.FC = (props) => {
  const scanReferences = props.scanReferences

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
        data={scanReferences}
        onRowClick={onRowClick}
      />
      <Spacer my={2} />
    </>
  )
}

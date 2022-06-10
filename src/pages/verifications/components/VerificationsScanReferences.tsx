import { useRouter } from "next/router"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { Form, Formik } from "formik"
import { VerificationsTable } from "./VerificationsTable"
import { VerificationsListQuery } from "__generated__/VerificationsListQuery.graphql"
import { Table } from "components/Table"
import { Button, Input, Spacer, Text } from "@artsy/palette"

export const VerificationsScanReferences: React.FC = (
  props
) => {
  const scanReferences = props.scanReferences

  return (
    <>
      <Spacer my={20} />
      <Text>
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
            accessor: "created_at",
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
        onRowClick={() => {}}
      />
    </>
  )
}

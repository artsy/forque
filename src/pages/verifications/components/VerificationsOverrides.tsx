import { Button, Input, Spacer, Text } from "@artsy/palette"
import { useRouter } from "next/router"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { Form, Formik } from "formik"
import { VerificationsTable } from "./VerificationsTable"
import { VerificationsListQuery } from "__generated__/VerificationsListQuery.graphql"
import { Table } from "components/Table"

export const VerificationsOverrides: React.FC = (
  props
) => {
  const overrides= props.overrides

  return (
    <>
      <Spacer my={20} />
      <Text>
        Overrides
      </Text>
      <Table
        columns={[
          {
            Header: "Admin Email",
            accessor: "userID",
          },
          {
            Header: "Created At",
            accessor: "created_at",
          },
          {
            Header: "Old State",
            accessor: "oldState",
          },
          {
            Header: "New State",
            accessor: "newState",
          },
          {
            Header: "Reason",
            accessor: "reason",
          },
        ]}
        data={overrides}
      />
    </>
  )
}

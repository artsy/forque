import { Button, Input, Spacer, Text } from "@artsy/palette"
import { useRouter } from "next/router"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { Form, Formik } from "formik"
import { VerificationsTable } from "./VerificationsTable"
import { VerificationsListQuery } from "__generated__/VerificationsListQuery.graphql"
import { Table } from "components/Table"
import styled from 'styled-components'

export const VerificationsOverrides: React.FC = (
  props
) => {
  const overrides= props.overrides

  const Styles = styled.div`
    table {
      border-spacing: 10;
      border: 1px solid black;
    }
  }
  `
  return (
    <>
      <Spacer my={20} />
      <Text>
        Overrides
      </Text>
      <Styles>
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
      </Styles>
    </>
  )
}

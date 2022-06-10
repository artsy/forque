import { Box, Button, Column, GridColumns, Input, Spacer, Text } from "@artsy/palette"
import { useRouter } from "next/router"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { Form, Formik } from "formik"
import { VerificationsTable } from "./VerificationsTable"
import { VerificationsListQuery } from "__generated__/VerificationsListQuery.graphql"
import { Table } from "components/Table"
import { VerificationsScanReferences } from "./VerificationsScanReferences"
import { VerificationsOverrides } from "./VerificationsOverrides"
import styled from 'styled-components'

export const VerificationsDetails: React.FC = (
  props
) => {
  const scanReferences = props.row.original.scanReferences
  const overrides = props.row.original.overrides

  const StyledBox = styled(Box)`
    table, th, td {
      border: 1px solid black;
    }
  }
  `
  return (
    <>
      <GridColumns>
        <Column span={1}>
        </Column>
        <Column span={10}>
          <StyledBox>
            <VerificationsScanReferences scanReferences={scanReferences} />
            <VerificationsOverrides overrides={overrides} />
          </StyledBox>
        </Column>
      </GridColumns>
    </>
  )
}

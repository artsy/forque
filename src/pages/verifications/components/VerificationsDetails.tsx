import { Button, Input, Text } from "@artsy/palette"
import { useRouter } from "next/router"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { Form, Formik } from "formik"
import { VerificationsTable } from "./VerificationsTable"
import { VerificationsListQuery } from "__generated__/VerificationsListQuery.graphql"
import { Table } from "components/Table"
import { VerificationsScanReferences } from "./VerificationsScanReferences"
import { VerificationsOverrides } from "./VerificationsOverrides"


export const VerificationsDetails: React.FC = (
  props
) => {
  const scanReferences = props.scanReferences
  const overrides = props.overrides
  return (
    <>
      <VerificationsScanReferences scanReferences={scanReferences} />
      <VerificationsOverrides overrides={overrides} />
    </>
  )
}

import { Column, GridColumns } from "@artsy/palette"
import { VerificationsOverrides } from "./VerificationsOverrides"
import { VerificationsScanReferences } from "./VerificationsScanReferences"

interface VerificationsDetailsProps {
  row: any
}

export const VerificationsDetails: React.FC<VerificationsDetailsProps> = (
  props
) => {
  const scanReferences = props.row.original.scanReferences
  const overrides = props.row.original.overrides

  return (
    <>
      <GridColumns>
        <Column span={1}></Column>
        <Column span={10}>
          <VerificationsScanReferences scanReferences={scanReferences} />
          <VerificationsOverrides overrides={overrides} />
        </Column>
      </GridColumns>
    </>
  )
}

import { Column, GridColumns } from "@artsy/palette"
import { VerificationsOverrides } from "./VerificationsOverrides"
import { VerificationsScanReferences } from "./VerificationsScanReferences"
import type { ScanReference } from "./types"
import { VerificationsOverrides_identityVerification$key } from "__generated__/VerificationsOverrides_identityVerification.graphql"

interface VerificationsDetailsProps {
  identityVerification: VerificationsOverrides_identityVerification$key
  scanReferences: ScanReference[]
}

export const VerificationsDetails: React.FC<VerificationsDetailsProps> = (
  props
) => {
  return (
    <>
      <GridColumns>
        <Column span={1}></Column>
        <Column span={10}>
          <VerificationsScanReferences scanReferences={props.scanReferences} />
          <VerificationsOverrides
            identityVerification={props.identityVerification}
          />
        </Column>
      </GridColumns>
    </>
  )
}

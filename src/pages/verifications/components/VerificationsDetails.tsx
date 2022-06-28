import { Column, GridColumns } from "@artsy/palette"
import { VerificationsOverrides } from "./VerificationsOverrides"
import { VerificationsScanReferences } from "./VerificationsScanReferences"
import { VerificationsOverrides_identityVerification$key } from "__generated__/VerificationsOverrides_identityVerification.graphql"
import { VerificationsScanReferences_identityVerification$key } from "__generated__/VerificationsScanReferences_identityVerification.graphql"

interface VerificationsDetailsProps {
  identityVerificationScanReferences: VerificationsScanReferences_identityVerification$key
  identityVerificationOverrides: VerificationsOverrides_identityVerification$key
}

export const VerificationsDetails: React.FC<VerificationsDetailsProps> = (
  props
) => {
  return (
    <>
      <GridColumns>
        <Column span={1}></Column>
        <Column span={10}>
          <VerificationsScanReferences
            identityVerification={props.identityVerificationScanReferences}
          />
          <VerificationsOverrides
            identityVerification={props.identityVerificationOverrides}
          />
        </Column>
      </GridColumns>
    </>
  )
}

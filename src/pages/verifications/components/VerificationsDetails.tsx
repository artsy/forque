import { Column, GridColumns } from "@artsy/palette"
import { VerificationsOverrides } from "./VerificationsOverrides"
import { VerificationsScanReferences } from "./VerificationsScanReferences"
import { VerificationsOverrides_identityVerification$key } from "__generated__/VerificationsOverrides_identityVerification.graphql"
import { VerificationsScanReferences_identityVerification$key } from "__generated__/VerificationsScanReferences_identityVerification.graphql"

interface VerificationsDetailsProps {
  scanReferences: VerificationsScanReferences_identityVerification$key
  overrides: VerificationsOverrides_identityVerification$key
}

export const VerificationsDetails: React.FC<VerificationsDetailsProps> = (
  props
) => {
  return (
    <>
      <GridColumns>
        <Column span={1}></Column>
        <Column span={10}>
          <VerificationsScanReferences data={props.scanReferences} />
          <VerificationsOverrides data={props.overrides} />
        </Column>
      </GridColumns>
    </>
  )
}

import { Column, GridColumns } from "@artsy/palette"
import { VerificationsOverrides } from "./VerificationsOverrides"
import { VerificationsScanReferences } from "./VerificationsScanReferences"
import { VerificationsOverrides_identityVerification$key } from "__generated__/VerificationsOverrides_identityVerification.graphql"
import { VerificationsScanReferences_identityVerification$key } from "__generated__/VerificationsScanReferences_identityVerification.graphql"

interface VerificationsDetailsProps {
  identityVerification:
    | VerificationsScanReferences_identityVerification$key
    | VerificationsOverrides_identityVerification$key
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
            identityVerification={
              props.identityVerification as VerificationsScanReferences_identityVerification$key
            }
          />
          <VerificationsOverrides
            identityVerification={
              props.identityVerification as VerificationsOverrides_identityVerification$key
            }
          />
        </Column>
      </GridColumns>
    </>
  )
}

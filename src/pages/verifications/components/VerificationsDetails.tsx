import { Column, GridColumns } from "@artsy/palette"
import { VerificationsOverrides } from "./VerificationsOverrides"
import { VerificationsScanReferences } from "./VerificationsScanReferences"
import type { Override, ScanReference } from "./types"
import { RefetchFnDynamic } from "react-relay"

interface VerificationsDetailsProps {
  identityVerificationID: string
  overrides: Override[]
  scanReferences: ScanReference[]
  relayRefetch: RefetchFnDynamic<any, any>
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
            identityVerificationID={props.identityVerificationID}
            overrides={props.overrides}
            relayRefetch={props.relayRefetch}
          />
        </Column>
      </GridColumns>
    </>
  )
}

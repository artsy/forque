import { Box, Column, GridColumns } from "@artsy/palette"
import { VerificationsOverrides } from "./VerificationsOverrides"
import { VerificationsScanReferences } from "./VerificationsScanReferences"
import styled from "styled-components"

export const VerificationsDetails: React.FC = (props) => {
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
        <Column span={1}></Column>
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

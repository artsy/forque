import { Button, Column, GridColumns, Text } from "@artsy/palette"
import { Table } from "components/Table"
import { useState } from "react"
import type { Override } from "./types"
import { VerificationsOverridesCreate } from "./VerificationsOverridesCreate"

interface VerificationsOverridesProps {
  identityVerificationID: string
  overrides: Override[]
}

export const VerificationsOverrides: React.FC<VerificationsOverridesProps> = (
  props
) => {
  const identityVerificationID = props.identityVerificationID
  const overrides = props.overrides
  const [displayOverrideForm, setDisplayOverrideForm] = useState(false)

  const onRowClick = () => {
    // do nothing
  }

  return (
    <>
      <GridColumns>
        <Column my={1}>
          <Text variant="lg">Overrides</Text>
        </Column>
        {displayOverrideForm ? (
          <Column p={1}>
            <VerificationsOverridesCreate
              identityVerificationID={identityVerificationID}
            />
          </Column>
        ) : (
          <Column p={1}>
            <Button
              size="small"
              variant="secondaryOutline"
              width={80}
              onClick={async (event) => {
                event.stopPropagation()
                event.preventDefault()
                setDisplayOverrideForm(true)
              }}
            >
              Create
            </Button>
          </Column>
        )}
      </GridColumns>
      <Table
        columns={[
          {
            Header: "Admin Email",
            accessor: "creator.email",
          },
          {
            Header: "Created At",
            accessor: "createdAt",
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
        onRowClick={onRowClick}
      />
    </>
  )
}

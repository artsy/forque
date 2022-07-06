import { Button, Column, GridColumns, Text } from "@artsy/palette"
import { Table } from "components/Table"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { VerificationsOverrides_identityVerification$key } from "__generated__/VerificationsOverrides_identityVerification.graphql"
import { VerificationsOverridesCreate } from "./VerificationsOverridesCreate"

interface VerificationsOverridesProps {
  data: VerificationsOverrides_identityVerification$key
}

export const VerificationsOverrides: React.FC<VerificationsOverridesProps> = (
  props
) => {
  const data = useFragment(
    graphql`
      fragment VerificationsOverrides_identityVerification on IdentityVerification {
        id
        internalID
        overrides {
          createdAt
          newState
          oldState
          reason
          userID
          creator {
            email
          }
        }
      }
    `,
    props.data
  )
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
              identityVerificationID={data.internalID}
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
        data={data.overrides as any}
        onRowClick={onRowClick}
      />
    </>
  )
}

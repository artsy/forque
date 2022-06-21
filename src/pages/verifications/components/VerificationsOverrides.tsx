import { Button, Column, GridColumns, Text, useToasts } from "@artsy/palette"
import { Table } from "components/Table"
import { useState } from "react"
import type { Override } from "./types"

interface VerificationsOverridesProps {
  overrides: Override[]
}

export const VerificationsOverrides: React.FC<VerificationsOverridesProps> = (
  props
) => {
  const overrides = props.overrides

  const onRowClick = () => {
    // do nothing
  }

  return (
    <>
      <GridColumns>
        <Column>
          <Text variant="lg" my={1}>
            Overrides
          </Text>
        </Column>
        <Column p={1}>
          <CreateOverrideButton
            onCreate={async () => {
              console.log("creating override")
              // ShowOverrideModal to collect state and reason for override
            }}
          ></CreateOverrideButton>
        </Column>
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

const CreateOverrideButton: React.FC<{
  onCreate: () => Promise<void>
}> = ({ onCreate }) => {
  const { sendToast } = useToasts()
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  return (
    <Button
      size="small"
      variant="secondaryOutline"
      width={80}
      loading={isCreating}
      onClick={async (event) => {
        event.stopPropagation()
        event.preventDefault()

        setShowConfirmMessage(true)

        if (showConfirmMessage) {
          setIsCreating(true)
          await onCreate()
          sendToast({
            message: "Successfully created override",
            variant: "alert",
          })
        }
      }}
    >
      {showConfirmMessage ? "Create?" : "Create"}
    </Button>
  )
}

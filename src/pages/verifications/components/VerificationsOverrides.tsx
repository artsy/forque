import { Text } from "@artsy/palette"
import { Table } from "components/Table"
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
      <Text variant="lg" my={1}>
        Overrides
      </Text>
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

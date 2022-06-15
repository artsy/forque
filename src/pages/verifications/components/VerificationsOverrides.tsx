import { Text } from "@artsy/palette"
import { Table } from "components/Table"

export const VerificationsOverrides: React.FC = (props) => {
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

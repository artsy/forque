import { Spacer } from "@artsy/palette"
import { Table } from "components/Table"

export const VerificationsOverrides: React.FC = (props) => {
  const overrides = props.overrides

  const onRowClick = () => {
    // do nothing
  }

  return (
    <>
      Overrides
      <Table
        columns={[
          {
            Header: "Admin User ID",
            accessor: "userID",
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
      <Spacer my={2} />
    </>
  )
}

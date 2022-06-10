import { Box, Text, THEME_V3 } from "@artsy/palette"
import { useMemo } from "react"
import { Row, useExpanded, useTable } from "react-table"
import styled from "styled-components"

interface TableProps {
  columns: any[]
  data: any[]
  onRowClick: (row: Row & { toggleExpandRow: () => void }) => void
  renderExpandedRow?: (row: Row) => JSX.Element
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  renderExpandedRow,
}) => {
  const columnsMemo = useMemo(() => columns, [columns])
  const dataMemo = useMemo(() => data, [data])

  const table = useTable(
    {
      columns: columnsMemo,
      data: dataMemo,
    },
    useExpanded
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = table

  return (
    <TableBase {...getTableProps()} as="table" width="100%" textAlign="left">
      <thead>
        {headerGroups.map((headerGroup, headerKey) => (
          <TR {...headerGroup.getHeaderGroupProps()} key={headerKey} as="tr">
            {headerGroup.headers.map((column, columnKey) => (
              <TH {...column.getHeaderProps()} key={columnKey} as="th">
                <Text variant="md" my={1}>
                  {column.render("Header")}
                </Text>
              </TH>
            ))}
          </TR>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row)
          return (
            <>
              <TRData
                {...row.getRowProps()}
                key={rowIndex}
                as="tr"
                onClick={() => {
                  onRowClick({
                    ...row,
                    toggleExpandRow: () => {
                      // TODO: Figure out how to inject `useExpanded` types
                      // into `Row` interface.
                      // @ts-ignore
                      row.getToggleRowExpandedProps().onClick()
                    },
                  })
                }}
                style={{ cursor: "pointer" }}
              >
                {row.cells.map((cell, cellKey) => {
                  return (
                    <TD {...cell.getCellProps()} key={cellKey} as="td">
                      {cell.render("Cell")}
                    </TD>
                  )
                })}
              </TRData>

              {
                // TODO: Figure out how to inject `useExpanded` types
                // into `Row` interface.
                // @ts-ignore
                row.isExpanded && renderExpandedRow && (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderExpandedRow?.(row)}
                    </td>
                  </tr>
                )
              }
            </>
          )
        })}
      </tbody>
    </TableBase>
  )
}

const TableBase = Box
const TR = Box
const TH = Box
const TD = Box

const TRData = styled(Box)`
  &:hover {
    background-color: ${THEME_V3.colors.black10};
  }
`

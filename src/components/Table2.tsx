import { Box, BoxProps, Text, THEME_V3 } from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { ReactElement, useState } from "react"

interface Column<T> {
  header: string
  accessor?: string
  Cell?: (props: { value?: any; values?: T }) => ReactElement | null
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  renderExpandedRow: (props: { values: T }) => ReactElement
}

export const Table2 = <T,>({
  columns,
  data,
  renderExpandedRow,
}: TableProps<T>) => {
  return (
    <TableBase as="table" width="100%" textAlign="left">
      <thead>
        <Box as="tr">
          {columns.map((column, columnKey) => {
            return (
              <Box as="th" key={columnKey}>
                <Text variant="md" my={1} px={1}>
                  {column.header}
                </Text>
              </Box>
            )
          })}
        </Box>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => {
          return (
            <TR<T>
              colSpan={columns.length}
              key={rowIndex}
              renderExpandedRow={renderExpandedRow}
              row={row}
              style={{
                cursor: "pointer",
              }}
            >
              {columns.map((column, key) => {
                const CellRenderer = column.Cell
                const accessor = column.accessor

                if (!(accessor || CellRenderer)) {
                  throw new Error(
                    'Either "accessor" or "Cell" must be provided to column configuration.'
                  )
                }

                // FIXME: Figure out how to handle possibly-undefined index types
                // @ts-ignore
                const value = row[accessor]

                return (
                  <TD key={key}>
                    {CellRenderer ? (
                      <CellRenderer value={value} values={row} />
                    ) : (
                      <>{value}</>
                    )}
                  </TD>
                )
              })}
            </TR>
          )
        })}
      </tbody>
    </TableBase>
  )
}

const TD: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box as="td" py={0.5} px={1} {...rest}>
      {children}
    </Box>
  )
}

const TR = <T,>({
  children,
  className,
  colSpan,
  renderExpandedRow,
  row,
  style,
}: {
  children: React.ReactNode
  className?: string
  colSpan: number
  renderExpandedRow?: TableProps<T>["renderExpandedRow"]
  row: any
  style: React.CSSProperties
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <Box
        as="tr"
        className={className}
        onClick={() => {
          if (renderExpandedRow) {
            setIsExpanded(!isExpanded)
          }
        }}
        style={style}
      >
        {children}
      </Box>

      {renderExpandedRow && isExpanded && (
        <tr>
          <td width="100%" colSpan={colSpan}>
            <>{renderExpandedRow({ values: row })}</>
          </td>
        </tr>
      )}
    </>
  )
}

const TableBase = styled(Box)`
  width: 100%;
  border: 1px solid ${themeGet("colors.black10")};
  /border-collapse: collapse;

  > thead > tr > th {
    text-align: left;
    font-weight: heavy;
  }

  > thead > tr > th,
  > tbody > tr > td {
    border-bottom: 1px solid ${themeGet("colors.black10")};
    border-left: 1px solid ${themeGet("colors.black10")};
    padding: ${themeGet("space.1")};
    overflow: auto;
  }

  tr {
    &:hover {
      background-color: ${THEME_V3.colors.black10};
    }
  }
`

import { FC } from 'react'
import {
  TableHeader,
  TR,
  TH,
  TD,
  TableBody,
  Table,
  Center
} from './styled.elements'
import R from '../../assets'

interface IColumnKey {
  [key: string]: string
}

interface ISimpleTable {
  columnKeys: IColumnKey
  rows: any[]
}
export const SimpleTable: FC<ISimpleTable> = ({ columnKeys, rows }) => {
  const renderHeader = () => {
    return (
      <TableHeader className="st-header">
        <TR>
          {columnKeys &&
            Object.keys(columnKeys).map((key, idx) => {
              return <TH key={idx}>{columnKeys[key]}</TH>
            })}
        </TR>
      </TableHeader>
    )
  }

  const renderBody = () => {
    return (
      <TableBody className="st-body">
        {rows.length > 0 ? (
          rows.map((row, idx) => {
            return (
              <TR key={idx}>
                {columnKeys &&
                  Object.keys(columnKeys).map((key, idx) => {
                    return <TD key={idx}>{row[key]}</TD>
                  })}
              </TR>
            )
          })
        ) : (
          <TR>
            <TD colSpan={Object.keys(columnKeys).length}>
              <Center>{R.strings.common.noData}</Center>
            </TD>
          </TR>
        )}
      </TableBody>
    )
  }
  return (
    <Table>
      {renderHeader()}
      {renderBody()}
    </Table>
  )
}

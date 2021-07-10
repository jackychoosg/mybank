import { FC } from 'react'
import moment from 'moment'
import { ICurrency, ITransaction } from '../../common/interfaces'
import { SimpleTable } from '../SimpleTable'
import R from '../../assets'
import { GreenLabel, RedLabel } from './styled.elements'
import { TransactionAction } from '../../common/enums'

const columnKeys = {
  timestamp: R.strings.dashboard.tableHeader.timestamp,
  description: R.strings.dashboard.tableHeader.description,
  action: R.strings.dashboard.tableHeader.action,
  currency: R.strings.dashboard.tableHeader.currency,
  amount: R.strings.dashboard.tableHeader.amount
}

const styledRows = (rows: ITransaction[], currencies: ICurrency[]) => {
  return rows.map((row) => {
    const amount = row.amount.toLocaleString('en-us')
    const currency = currencies.find((c) => c.id === row.currencyId)
    return {
      id: row.id,
      timestamp: moment.unix(row.timestamp).format('LLL'),
      description: row.description,
      action: row.action,
      currency: currency?.code,
      amount:
        row.action === TransactionAction.DEBIT ? (
          <RedLabel>-${amount}</RedLabel>
        ) : (
          <GreenLabel>+${amount}</GreenLabel>
        )
    }
  })
}

type Props = {
  rows: ITransaction[]
  selectedAccount: number
  currencies: ICurrency[]
}

export const TransactionList: FC<Props> = ({
  rows,
  selectedAccount,
  currencies
}) => {
  const filterRows = rows.filter((row) => row.accountId === selectedAccount)
  return (
    <SimpleTable
      columnKeys={columnKeys}
      rows={styledRows(filterRows, currencies)}
    />
  )
}

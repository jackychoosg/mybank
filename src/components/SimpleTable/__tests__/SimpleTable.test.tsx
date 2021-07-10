import { render, cleanup } from '@testing-library/react'
import { SimpleTable } from '../index'
import R from '../../../assets'

describe('SimpleTable component', () => {
  afterEach(cleanup)
  const columnKeys = {
    timestamp: R.strings.dashboard.tableHeader.timestamp,
    description: R.strings.dashboard.tableHeader.description,
    action: R.strings.dashboard.tableHeader.action,
    currency: R.strings.dashboard.tableHeader.currency,
    amount: R.strings.dashboard.tableHeader.amount
  }
  it('should take a snapshot with empty data', () => {
    const { asFragment } = render(
      <SimpleTable columnKeys={columnKeys} rows={[]} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should take a snapshot with data', () => {
    const data = [
      {
        accountId: 1,
        currencyId: 1,
        timestamp: 1625829468,
        reference: '948324085',
        amount: 1000,
        description: 'Testing',
        action: 'debit',
        id: 1
      }
    ]
    const { asFragment } = render(
      <SimpleTable columnKeys={columnKeys} rows={data} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

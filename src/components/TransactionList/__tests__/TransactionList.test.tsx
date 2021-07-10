import { render, cleanup } from '@testing-library/react'
import { TransactionAction } from '../../../common/enums'
import { TransactionList } from '../index'
describe('TransactionList component', () => {
  afterEach(cleanup)
  const currencies = [
    {
      id: 1,
      code: 'SGD',
      name: 'Singapore Dollar'
    },
    {
      id: 2,
      code: 'AUD',
      name: 'Australia Dollar'
    }
  ]

  const data = [
    {
      accountId: 1,
      currencyId: 1,
      timestamp: 1625829468,
      reference: '948324085',
      amount: 1000,
      description: 'Testing',
      action: TransactionAction.DEBIT,
      id: 1
    },
    {
      accountId: 2,
      currencyId: 2,
      timestamp: 1625829468,
      reference: '948324085',
      amount: 1000,
      description: 'Testing',
      action: TransactionAction.CREDIT,
      id: 1
    }
  ]
  it('should take a snapshot with Debit data', () => {
    const { asFragment } = render(
      <TransactionList
        currencies={currencies}
        selectedAccount={1}
        rows={data}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should take a snapshot with credit data', () => {
    const { asFragment } = render(
      <TransactionList
        currencies={currencies}
        selectedAccount={2}
        rows={data}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

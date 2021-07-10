import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from '../App'
import R from '../../assets'
import apis from '../../apis'
import { TransactionAction } from '../../common/enums'
const accounts = [
  {
    id: 1,
    name: 'Account 1',
    accountNumber: '111111111'
  },
  {
    id: 2,
    name: 'Account 2',
    accountNumber: '222222222'
  },
  {
    id: 3,
    name: 'Account 3',
    accountNumber: '333333333'
  }
]
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

const transactions = [
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

describe('App component', () => {
  beforeEach(() => {
    jest.spyOn(apis, 'getAccounts').mockResolvedValueOnce(accounts)
    jest.spyOn(apis, 'getCurrencies').mockResolvedValueOnce(currencies)
    jest.spyOn(apis, 'getTrasactions').mockResolvedValueOnce(transactions)
    jest.spyOn(apis, 'createTransaction').mockResolvedValueOnce('')
  })

  afterEach(cleanup)

  it('should render default App', async () => {
    render(<App />)
    expect(screen.getByText(R.strings.dashboard.title)).toBeInTheDocument()
    expect(screen.getByText(R.strings.common.loading)).toBeInTheDocument()
    expect(apis.getAccounts).toHaveBeenCalledTimes(1)
    expect(apis.getCurrencies).toHaveBeenCalledTimes(1)
    expect(apis.getTrasactions).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('debit')).toBeTruthy()
  })

  it('should show new account list after changing account', async () => {
    render(<App />)
    const dropdowns = await screen.findAllByTestId('select')
    fireEvent.change(dropdowns[0], { target: { value: 2 } })
    expect(await screen.findByText('credit')).toBeTruthy()
  })

  it('should open fund transfer modal form', () => {
    const { getByTestId, getByText } = render(<App />)
    const newTransferBtn = getByTestId('new-transfer-button')
    fireEvent.click(newTransferBtn)
    expect(getByText(R.strings.form.header)).toBeTruthy()
  })

  it('should show error message if no validation fail', () => {
    const { getByTestId, getByText } = render(<App />)
    const newTransferBtn = getByTestId('new-transfer-button')
    fireEvent.click(newTransferBtn)
    const confirmBtn = getByTestId('confirm')
    fireEvent.click(confirmBtn)
    expect(getByText(R.strings.form.errors.fromAccount)).toBeTruthy()
    expect(getByText(R.strings.form.errors.toAccount)).toBeTruthy()
    expect(getByText(R.strings.form.errors.amount)).toBeTruthy()
    expect(getByText(R.strings.form.errors.currencyId)).toBeTruthy()
  })

  it('should close fund transfer modal form', () => {
    const { getByTestId, queryByText } = render(<App />)
    const newTransferBtn = getByTestId('new-transfer-button')
    fireEvent.click(newTransferBtn)
    const cancelBtn = getByTestId('cancel')
    fireEvent.click(cancelBtn)
    expect(queryByText(R.strings.form.header)).toBeFalsy()
  })

  it('should show validation error message if required value not provided', async () => {
    const { getByTestId, findByText } = render(<App />)
    const newTransferBtn = getByTestId('new-transfer-button')
    fireEvent.click(newTransferBtn)
    const confirmBtn = getByTestId('confirm')
    fireEvent.click(confirmBtn)
    expect(await findByText(R.strings.form.errors.amount)).toBeTruthy()
    expect(await findByText(R.strings.form.errors.fromAccount)).toBeTruthy()
    expect(await findByText(R.strings.form.errors.toAccount)).toBeTruthy()
    expect(await findByText(R.strings.form.errors.currencyId)).toBeTruthy()
  })

  it('should start fund transfer', async () => {
    const { getByTestId, findAllByTestId, getByPlaceholderText } = render(
      <App />
    )
    const newTransferBtn = getByTestId('new-transfer-button')
    fireEvent.click(newTransferBtn)
    const allDropdowns = await findAllByTestId('select')
    const fromAccountDropdown = allDropdowns[1]
    const toAccountDropdown = allDropdowns[2]
    const currencyDropdown = allDropdowns[3]
    const amountInput = getByPlaceholderText(R.strings.form.amountPlaceHolder)
    const textAreaIput = getByTestId('text-area')
    fireEvent.change(fromAccountDropdown, { target: { value: 2 } })
    fireEvent.change(toAccountDropdown, { target: { value: 1 } })
    fireEvent.change(currencyDropdown, { target: { value: 2 } })
    fireEvent.change(amountInput, { target: { value: 222 } })
    fireEvent.change(textAreaIput, { target: { value: 'description' } })
    const confirmBtn = getByTestId('confirm')
    fireEvent.click(confirmBtn)
    expect(apis.createTransaction).toHaveBeenCalledTimes(2)
  })
})

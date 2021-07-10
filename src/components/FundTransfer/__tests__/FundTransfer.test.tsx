import { render, cleanup, fireEvent } from '@testing-library/react'
import { FundTransfer } from '../index'
describe('FundTransfer component', () => {
  afterEach(cleanup)
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
  const onDropdownChange = jest.fn()
  const onValueChange = jest.fn()
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <FundTransfer
        fromAccount={1}
        toAccount={2}
        accountDropdownOptions={accounts}
        amount={1000}
        onDropdownChange={onDropdownChange}
        onValueChange={onValueChange}
        description="Testing"
        currencies={currencies}
        currencyId={1}
        errors={{ amount: 'required' }}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onDropdownChange action', () => {
    const { getAllByTestId } = render(
      <FundTransfer
        fromAccount={1}
        toAccount={2}
        accountDropdownOptions={accounts}
        amount={1000}
        onDropdownChange={onDropdownChange}
        onValueChange={onValueChange}
        description="Testing"
        currencies={currencies}
        currencyId={1}
        errors={{}}
      />
    )
    const allDropdowns = getAllByTestId('select')
    const fromAccountDropdown = allDropdowns[0]
    const toAccountDropdown = allDropdowns[1]
    const currencyDropdown = allDropdowns[2]
    fireEvent.change(fromAccountDropdown, { target: { value: 2 } })
    fireEvent.change(toAccountDropdown, { target: { value: 1 } })
    fireEvent.change(currencyDropdown, { target: { value: 2 } })
    expect(onDropdownChange).toBeCalledTimes(3)
  })

  it('should call onValueChange action', () => {
    const { getByTestId } = render(
      <FundTransfer
        fromAccount={1}
        toAccount={2}
        accountDropdownOptions={accounts}
        amount={1000}
        onDropdownChange={onDropdownChange}
        onValueChange={onValueChange}
        description="Testing"
        currencies={currencies}
        currencyId={1}
        errors={{}}
      />
    )
    const textAreaIput = getByTestId('text-area')
    fireEvent.change(textAreaIput, { target: { value: 'description' } })
    expect(onValueChange).toHaveBeenCalled()
  })
})

import { render, cleanup, fireEvent } from '@testing-library/react'
import { DropDown } from '../index'
describe('DropDown component', () => {
  afterEach(cleanup)
  const items = [
    {
      id: 1,
      name: 'account1'
    },
    {
      id: 2,
      name: 'account2'
    }
  ]
  const onDropdownChange = jest.fn()
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <DropDown
        label="Account"
        items={items}
        selectedItem={0}
        onChange={onDropdownChange}
        defaultOptionLabel="--Choose the item--"
        errorMessage="Required"
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onChange action', () => {
    const { getByTestId, getAllByTestId } = render(
      <DropDown
        label="Account"
        items={items}
        selectedItem={1}
        onChange={onDropdownChange}
        defaultOptionLabel="--Choose the item--"
      />
    )
    let options = getAllByTestId('select-option') as HTMLOptionElement[]
    expect(options[0].selected).toBeFalsy()
    expect(options[1].selected).toBeTruthy()
    expect(options[2].selected).toBeFalsy()
    fireEvent.change(getByTestId('select'), { target: { value: 2 } })
    expect(onDropdownChange).toBeCalled()
  })
})

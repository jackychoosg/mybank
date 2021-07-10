import { FC } from 'react'
import { ErrorMessage } from '../../common/styled/styled.elements'
import { IOption } from '../../common/interfaces'
import { DropdownC, Label, Select, Option } from './styled.elements'

interface IDropdown {
  label: string
  items: IOption[]
  selectedItem: number
  defaultOptionLabel: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  errorMessage?: string
}
export const DropDown: FC<IDropdown> = ({
  label,
  items,
  errorMessage,
  selectedItem,
  defaultOptionLabel,
  onChange
}) => {
  return (
    <DropdownC>
      <Label>{label}</Label>
      <Select
        onChange={onChange}
        value={selectedItem}
        error={!!errorMessage ? 'error' : 'none'}
        data-testid="select"
      >
        <Option value={0} data-testid="select-option">
          {defaultOptionLabel}
        </Option>
        {items.map((option) => {
          return (
            <Option
              key={option.id}
              value={option.id}
              data-testid="select-option"
            >
              {option.name}
            </Option>
          )
        })}
      </Select>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </DropdownC>
  )
}

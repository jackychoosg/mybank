import {
  FormContainer,
  CurrencyInput,
  Title,
  TextArea,
  Message,
  FieldSet
} from './styled.elements'
import R from '../../assets'
import { DropDown } from '../Dropdown'
import { IOption } from '../../common/interfaces'
import { ErrorMessage } from '../../common/styled/styled.elements'
import { FC } from 'react'

interface ICurrencyBlock {
  amount: string | number
  onValueChange: (value?: string, name?: string) => void
  errorMessage?: string
}
const CurrencyBlock: FC<ICurrencyBlock> = ({
  amount,
  errorMessage,
  onValueChange
}) => {
  return (
    <FieldSet>
      <Title>
        {R.strings.form.amount}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Title>
      <CurrencyInput
        id="input-amount"
        name="amount"
        placeholder={R.strings.form.amountPlaceHolder}
        defaultValue={amount}
        prefix="$"
        decimalsLimit={2}
        onValueChange={onValueChange}
        error={!!errorMessage ? 'error' : 'none'}
      />
    </FieldSet>
  )
}

interface IDescriptionBlock {
  description: string
  maxLength: number
  onValueChange: (value?: string, name?: string) => void
}
const DescriptionBlock: FC<IDescriptionBlock> = ({
  description,
  maxLength,
  onValueChange
}) => {
  return (
    <FieldSet>
      <Title>Description(Optional)</Title>
      <TextArea
        data-testid="text-area"
        maxLength={maxLength}
        onChange={(e) => onValueChange(e.target.value, 'description')}
        value={description}
      />
      <Message>{maxLength - description.length} characters remaining.</Message>
    </FieldSet>
  )
}

interface IFundTransfer {
  fromAccount: number
  toAccount: number
  currencyId: number
  amount: string | number
  description: string
  accountDropdownOptions: IOption[]
  currencies: IOption[]
  errors: { [key: string]: string }
  onDropdownChange: (
    key: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void
  onValueChange: (value?: string, name?: string) => void
}
export const FundTransfer: FC<IFundTransfer> = ({
  fromAccount,
  toAccount,
  currencyId,
  amount,
  description,
  accountDropdownOptions,
  currencies,
  errors,
  onDropdownChange,
  onValueChange
}) => {
  const fromAccountDropdownOptions = accountDropdownOptions.filter(
    (a) => a.id !== toAccount
  )
  const toAccountDropdownOptions = accountDropdownOptions.filter(
    (a) => a.id !== fromAccount
  )

  return (
    <FormContainer>
      <DropDown
        label={R.strings.form.from}
        selectedItem={fromAccount}
        items={fromAccountDropdownOptions}
        defaultOptionLabel={R.strings.form.defaultOptionLabel}
        onChange={(e) => onDropdownChange('fromAccount', e)}
        errorMessage={errors['fromAccount']}
      />
      <DropDown
        label={R.strings.form.to}
        selectedItem={toAccount}
        items={toAccountDropdownOptions}
        defaultOptionLabel={R.strings.form.defaultOptionLabel}
        onChange={(e) => onDropdownChange('toAccount', e)}
        errorMessage={errors['toAccount']}
      />
      <DropDown
        label={R.strings.form.currency}
        selectedItem={currencyId}
        items={currencies}
        defaultOptionLabel={R.strings.form.defaultCurrencyOptionLabel}
        onChange={(e) => onDropdownChange('currencyId', e)}
        errorMessage={errors['currencyId']}
      />
      <CurrencyBlock
        amount={amount}
        onValueChange={onValueChange}
        errorMessage={errors['amount']}
      />
      <DescriptionBlock
        description={description}
        onValueChange={onValueChange}
        maxLength={200}
      />
    </FormContainer>
  )
}

import styled from 'styled-components'
import DefaultCurrencyInput from 'react-currency-input-field'

export const FormContainer = styled.div`
  padding: 16px;
`
export const FieldSet = styled.div`
  margin-top: 10px;
`
export const CurrencyInput = styled(DefaultCurrencyInput)<{
  error?: string
}>`
  padding: 10px;
  margin: 10px 0 10px 0;
  font-size: 16px;
  border-color: ${(props) => (props.error === 'error' ? 'red' : 'light-dark')};
`
export const Title = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const TextArea = styled.textarea`
  width: 100%;
  display: block;
  padding: 8px;
  margin: 5px 0 0 0;
  font-size: 16px;
  transition: border-color 1s ease;
  box-sizing: border-box;
`

export const Message = styled.div`
  color: ${(props) => props.color ?? 'green'};
  display: flex;
  flex-direction: row-reverse;
`

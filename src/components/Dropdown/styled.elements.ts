import styled from 'styled-components'

export const DropdownC = styled.div`
  width: 45%;
  margin-top: 10px;
`

export const Label = styled.label`
  font-weight: bold;
`

export const Select = styled.select<{ error?: string }>`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  transition: border-color 1s ease;
  border-color: ${(props) => (props.error === 'error' ? 'red' : 'light-dark')};
`

export const Option = styled.option``

import styled from 'styled-components'

export const Container = styled.div``

export const Header = styled.div`
  background-color: #2485da;
  padding: 30px 0;
  color: white;
  font-weight: bold;
  text-align: center;
  margin: -10px -10px 0;
`

export const ButtonWrap = styled.div`
  padding: 10px 0;
  align-items: center;
  display: flex;
`

export const Button = styled.button`
  padding: 10px;
  width: 120px;
  border: 0;
  color: white;
  cursor: pointer;
  font-size: 16px;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

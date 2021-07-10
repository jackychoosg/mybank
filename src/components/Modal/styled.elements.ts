import styled from 'styled-components'

export const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  height: 100%;
  text-align: center;
  z-index: 2;
`

export const ModalContent = styled.div`
  display: block;
  text-align: left;
  background: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  max-width: 90%;
  max-height: 90%;
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  z-index: 2;
`

export const CloseButton = styled.span`
  background: #000;
  color: #fff;
  border: 1px solid white;
  border-radius: 200em;
  padding: 12px;
  display: block;
  position: absolute;
  left: 100%;
  top: 0;
  transform: translate(-50%, -50%);
  cursor: pointer;
  &:after {
    font-size: 16px;
    content: 'x';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

export const ButtonC = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row-reverse;
`

export const Header = styled.div`
  background-color: #2485da;
  padding: 20px;
  color: white;
  font-weight: bold;
  text-align: center;
`

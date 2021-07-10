import { FC } from 'react'
import { Button } from '../../containers/styled.elements'
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  ButtonC,
  Header
} from './styled.elements'
import R from '../../assets'

type Props = {
  onClose: () => void
  onConfirm: () => void
  title: string
  children: JSX.Element
}
export const Modal: FC<Props> = ({ onClose, onConfirm, title, children }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose} />
        <Header>{title}</Header>
        {children}
        <ButtonC>
          <Button data-testid="cancel" color="red" onClick={onClose}>
            {R.strings.common.cancelText}
          </Button>
          <Button data-testid="confirm" color="green" onClick={onConfirm}>
            {R.strings.common.confirmText}
          </Button>
        </ButtonC>
      </ModalContent>
    </ModalContainer>
  )
}

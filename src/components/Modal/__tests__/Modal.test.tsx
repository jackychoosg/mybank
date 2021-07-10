import { render, cleanup, fireEvent } from '@testing-library/react'
import { Modal } from '../index'
describe('Modal component', () => {
  afterEach(cleanup)
  const onClose = jest.fn()
  const onConfirm = jest.fn()
  const title = 'This is title'
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <Modal onClose={onClose} onConfirm={onConfirm} title={title}>
        <div>Testing</div>
      </Modal>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onConfirm action', () => {
    const { getByTestId } = render(
      <Modal onClose={onClose} onConfirm={onConfirm} title={title}>
        <div>Testing</div>
      </Modal>
    )
    const confirmBtn = getByTestId('confirm')
    fireEvent.click(confirmBtn)
    expect(onConfirm).toBeCalled()
  })

  it('should call onCancel action', () => {
    const { getByTestId } = render(
      <Modal onClose={onClose} onConfirm={onConfirm} title={title}>
        <div>Testing</div>
      </Modal>
    )
    const cancelBtn = getByTestId('cancel')
    fireEvent.click(cancelBtn)
    expect(onClose).toBeCalled()
  })
})

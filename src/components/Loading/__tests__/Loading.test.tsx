import { render, cleanup } from '@testing-library/react'
import { Loading } from '../index'
describe('Loading component', () => {
  afterEach(cleanup)

  it('should take a snapshot', () => {
    const { asFragment } = render(<Loading />)

    expect(asFragment()).toMatchSnapshot()
  })
})

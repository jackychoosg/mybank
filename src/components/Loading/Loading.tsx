import { LoadingC, LoadingContent } from './styled.elements'
import R from '../../assets'

export const Loading = () => {
  return (
    <LoadingC>
      <LoadingContent>{R.strings.common.loading}</LoadingContent>
    </LoadingC>
  )
}

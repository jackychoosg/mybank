import styled from 'styled-components'

export const LoadingC = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  text-align: center;
  z-index: 2;
  display: flex;
  flex: 1;
`

export const LoadingContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: white;
`

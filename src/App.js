import React from 'react'
import styled from 'styled-components'
import Matrix from './Matrix'

const MainWrapper = styled.div`
  flex-direction: column;
  background-color: #e3e3e3;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  height: 100vh;
`

function App() {
  return (
    <MainWrapper>
      <Matrix />
    </MainWrapper>
  )
}
export default App

import React, { useState } from 'react'
import * as R from 'ramda'
import { animated } from 'react-spring'
import styled from 'styled-components'
import { toggle } from './utils'

const isRunning = R.equals('running')

const Icon = ({ transport }) => {
  return (
    <animated.svg viewBox="0 0 36 36">
      {isRunning(transport) ? (
        <path
          data-testid="pause-icon"
          id="pause-icon"
          d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26"
          data-state="playing"
        />
      ) : (
        <path
          data-testid="play-icon"
          id="play-icon"
          data-state="paused"
          d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28"
        />
      )}
    </animated.svg>
  )
}

const Button = styled.div`
  height: 100%;
  background-color: #e3e3e3;
  grid-column-start: 8;
  grid-row-start: 9;
`
const toggleTransport = toggle('running', 'stopped')

export default function useStart() {
  const [transport, set] = useState('stopped')
  const togglePlay = () => set(toggleTransport(transport))
  return [
    transport,
    <Button
      data-testid="start-stop-button"
      transport={transport}
      onClick={togglePlay}>
      <Icon transport={transport} />
    </Button>
  ]
}

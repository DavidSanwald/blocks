import React, { useRef, useState, useEffect } from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import Tone from 'tone'
import {
  useTransition,
  animated,
  config,
  useSpring,
  useChain
} from 'react-spring'
import Square from './Square'
import useStart from './useStart'
import useSequencer from './useSequencer'
import useSound from './useSound'

const isRunning = R.equals('running')

const soundState = R.curry((transport, currentStep, tone) => {
  const { toneState, step } = tone
  return R.equals('stopped', transport)
    ? 'mute'
    : step === currentStep
    ? toneState === 'selected'
      ? 'playing'
      : 'mute'
    : 'mute'
})

const StyledMatrix = styled(animated.div)`
  height: 80vmin;
  width: calc(80vmin * (8 / 9));
  display: grid;
  grid-gap: 3vmin;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(9, 1fr);
`

function Matrix() {
  const [transport, startButton] = useStart()
  const matrixRef = useRef()
  const transitionRef = useRef()
  const props = useSpring({
    from: { gridGap: isRunning(transport) ? '0px' : '3vmin' },
    to: { gridGap: isRunning(transport) ? '3vmin' : '0px' },
    ref: matrixRef
  })
  const [state, dispatch] = useSequencer()
  const [buffers, setBuffers] = useState({})
  const [currentStep, setCurrentStepState] = useState(0)

  useEffect(() => {
    if (isRunning(transport)) {
      Tone.Transport.bpm.value = 120
      Tone.Transport.start()
    } else {
      Tone.Transport.stop()
      setCurrentStepState(0)
    }
  })

  const buffersRef = useRef(buffers)
  buffersRef.current = buffers

  const stepsRef = useRef(state)
  stepsRef.current = state

  const currentStepRef = useRef(currentStep)
  currentStepRef.current = currentStep
  useSound(
    setBuffers,
    setCurrentStepState,
    currentStepRef,
    buffersRef,
    stepsRef
  )
  const trans = useTransition(state, tone => tone.note + tone.step, {
    from: { opacity: 0, transform: 'scale(0.8)' },
    enter: item => async (next, cancel) => {
      await next({ opacity: 1, transform: 'scale(1)' })
    },
    config: config.wobbly,
    trail: 15,
    ref: transitionRef
  })
  useChain([transitionRef, matrixRef])

  return (
    <>
      <StyledMatrix style={props}>
        {trans.map(({ item, key, props }) => (
          <Square
            transport={transport}
            toneState={item.toneState}
            note={item.note}
            step={item.step}
            style={props}
            soundState={soundState(transport, currentStep, item)}
            key={key}
            onClick={() =>
              dispatch({
                type: 'TOGGLE',
                payload: { note: item.note, step: item.step }
              })
            }
          />
        ))}
        {startButton}
      </StyledMatrix>
    </>
  )
}
export default Matrix

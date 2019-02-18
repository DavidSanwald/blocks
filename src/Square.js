import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import * as R from 'ramda'
import chroma from 'chroma-js'

const StyledSquare = styled(animated.div)`
  cursor: pointer;
  height: 100%;
  width: 100%;
  will-change: transform;
  background: ${props => props.color};
  &:hover {
    background: ${props => chroma(props.color).darken()};
  }
`
const checkEquality = (prevProps, nextProps) => {
  return R.eqBy(
    R.pick(['toneState', 'transport', 'soundState']),
    prevProps,
    nextProps
  )
}
const getElevationLevel = (transport, uiState, soundState, toneState) => {
  if (transport === 'stopped') {
    return 'flat'
  } else if (soundState === 'playing') {
    return 'high'
  } else if (uiState === 'hovered') {
    return 'middle'
  } else if (uiState === 'clicked' || toneState === 'selected') {
    return 'low'
  } else {
    return 'flat'
  }
}
const elevationStyles = {
  flat: { scale: 1, s: 0 },
  low: { scale: 1.05, s: 0.3 },
  middle: { scale: 1.1, s: 0.8 },
  high: { scale: 1.2, s: 1 }
}
function Square({
  toneState,
  soundState,
  transport,
  step,
  style,
  note,
  onClick
}) {
  const [uiState, setUiState] = useState('idle')
  const [elevationLevel, setElevationLevel] = useState(0)
  const [elevation, setElevation] = useSpring(() => ({ scale: 1, s: 0 }))
  useEffect(() => {
    setElevationLevel(
      getElevationLevel(transport, uiState, soundState, toneState)
    )
  }, [uiState, toneState, soundState, transport])
  setElevation(elevationStyles[elevationLevel])
  const color =
    toneState === 'unselected'
      ? '#c9c9c9'
      : soundState === 'playing'
      ? '#9ad3de'
      : '#89bdd3'

  return (
    <StyledSquare
      style={{
        ...style,

        boxShadow: elevation.s.interpolate(
          s =>
            ` 0px ${s * 1.4}em ${s * 2.8}em rgba(0,0,0,0.25), 0 ${s *
              1.0}em ${s * 1.0}em rgba(0,0,0,0.22)`
        ),
        ...elevation.scale
      }}
      color={color}
      onMouseEnter={() => setUiState('hovered')}
      onTouchStart={() => setUiState('hovered')}
      onMouseLeave={() => setUiState('idle')}
      onTouchEnd={() => setUiState('idle')}
      onClick={onClick}
      onMouseDown={() => setUiState('clicked')}
      onMouseUp={() => setUiState('hovered')}>
      {''}
    </StyledSquare>
  )
}

Square.propTypes = {
  toneState: PropTypes.oneOf(['unselected', 'selected']).isRequired,
  soundState: PropTypes.oneOf(['playing', 'mute']).isRequired,
  transport: PropTypes.oneOf(['running', 'stopped']).isRequired,
  step: PropTypes.number.isRequired,
  note: PropTypes.oneOf('ABCDEFGHIJ'.split('')).isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
}

Square.defaultProps = {
  style: {}
}

export default React.memo(Square, checkEquality)

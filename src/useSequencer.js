import React, { useReducer } from 'react'
import * as R from 'ramda'
import { toggle } from './utils'
import { initTones, playersConfig, compressorConfig } from './TonesConfig'
import { stat } from 'fs'

const isSameNote = (note, step) => R.whereEq({ note, step })
const toggleRightPad = (note, step) => {
  return R.map(R.ifElse(isSameNote(note, step), togglePad, R.identity))
}

const togglePad = R.evolve({
  toneState: toggle('unselected', 'selected')
})

const reducer = (state, action) => {
  const { type } = action
  switch (type) {
    case 'TOGGLE':
      const {
        payload: { note, step }
      } = action
      return toggleRightPad(note, step)(state)
    default:
      return state
  }
}

const useSequencer = () => {
  const [state, dispatch] = useReducer(reducer, initTones)
  return [state, dispatch]
}
export { reducer }
export default useSequencer

import * as R from 'ramda'

const urls = {
  A: './audio/0.mp3',
  B: './audio/1.mp3',
  C: './audio/2.mp3',
  D: './audio/3.mp3',
  F: './audio/4.mp3',
  G: './audio/5.mp3',
  H: './audio/6.mp3',
  I: './audio/7.mp3'
}

const soundConfig = {
  volume: -7,
  fadeOut: 0.1
}

export const compressorConfig = {
  ratio: 10,
  threshold: -30,
  release: 0.1,
  attack: 0.02,
  knee: 10
}

export const playersConfig = { ...urls, ...soundConfig }

const steps = [0, 1, 2, 3, 4, 5, 6, 7]
const notes = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I']

const cartesianProd = R.lift((note, step) => ({
  note,
  step,
  toneState: 'unselected'
}))

export const initTones = cartesianProd(notes, steps)

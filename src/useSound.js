import { useEffect } from 'react'
import * as R from 'ramda'
import { playersConfig, compressorConfig } from './TonesConfig'
import Tone from 'tone'

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

const useSound = (
  setBuffers,
  setCurrentStepState,
  currentStepRef,
  buffersRef,
  stepsRef
) => {
  useEffect(() => {
    const compressor = new Tone.Compressor(compressorConfig)

    const delay = new Tone.PingPongDelay('4n.')
    delay.wet.value = 0.2

    const players = new Tone.Players(playersConfig).toMaster()

    const instruments = players.chain(delay, compressor, Tone.Master)
    setBuffers(instruments)
  }, [])

  useEffect(() => {
    Tone.Transport.scheduleRepeat(function(time) {
      Tone.Draw.schedule(function() {
        setCurrentStepState(step => {
          return step > 6 ? 0 : step + 1
        })
      })
      const makesSoundNow = R.compose(
        R.equals('playing'),
        soundState('running', currentStepRef.current)
      )
      const play = stepsRef.current.filter(makesSoundNow)
      play.forEach(({ note }) => {
        buffersRef.current.get(note).start(time)
      })
    }, '8n')
  }, [])
}

export default useSound

import { reducer } from '.././useSequencer'

describe('The reducer is a pure function that returns the new state', () => {
  it('takes an action and returns the old state if the type is unknown', () => {
    const nextState = reducer('default', {
      type: undefined,
      payload: undefined
    })
    expect(nextState).toBe('default')
  })
  it('toggles the right pad', () => {
    const action = { type: 'TOGGLE', payload: { note: 'A', step: 1 } }
    const oldState = [
      { note: 'A', step: 1, toneState: 'unselected' },
      { note: 'B', step: 1, toneState: 'unselected' }
    ]
    const nextState = reducer(oldState, action)
    expect(nextState).toEqual(
      expect.arrayContaining([{ note: 'A', step: 1, toneState: 'selected' }])
    )
    const thirdState = reducer(nextState, action)
    expect(thirdState).toEqual(oldState)
  })
})

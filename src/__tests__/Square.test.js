import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Square from '../Square'

const onClickMock = jest.fn()

afterEach(cleanup)

test('renders a colored Square', () => {
  const { container } = render(
    <Square
      onClick={onClickMock}
      toneState={'selected'}
      transport={'running'}
      soundState={'mute'}
      step={1}
      note={'A'}
    />
  )
})

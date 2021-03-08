import { render, screen, fireEvent } from '@testing-library/react'

import defaultSettings from 'defaultSettings'

import Settings from 'components/Settings'

test('Daily caloric target can be changed', () => {
  const updateCallback = jest.fn()

  render(<Settings settings={defaultSettings} onDailyCaloricTargetChange={updateCallback} />)

  fireEvent.change(screen.getByTestId('Settings dailyCaloricTarget input'), {
    target: { value: '2000' },
  })

  expect(updateCallback).toBeCalledWith(2000)
})

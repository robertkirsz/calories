import React from 'react'
import { render, screen } from '@testing-library/react'

import App from 'App'
import mockDays from 'days.json'

test('Renders button for adding new days', () => {
  render(<App initialState={mockDays} />)
  const addDayButton = screen.getByText('New day')
  expect(addDayButton).toBeInTheDocument()
})

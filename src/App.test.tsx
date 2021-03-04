import React from 'react'
import { render, screen } from '@testing-library/react'

import App from 'App'
import mockDays from 'days.json'

test('Renders button for adding new days', () => {
  render(<App initialState={mockDays} />)
  const addDayButton = screen.getByText('New day')
  expect(addDayButton).toBeInTheDocument()
})

test('Renders days list', () => {
  render(<App initialState={mockDays} />)
  const daysList = screen.getAllByTestId('Day')
  expect(daysList).toHaveLength(3)
})

test('Renders meals list', () => {
  render(<App initialState={mockDays} />)
  const mealsList = screen.getAllByTestId('Meal')
  expect(mealsList).toHaveLength(6)
})

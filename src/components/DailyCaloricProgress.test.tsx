import { render, screen } from '@testing-library/react'

import DailyCaloricProgress from 'components/DailyCaloricProgress'

test('Displays daily caloric progress', () => {
  render(<DailyCaloricProgress percentage={50} />)

  expect(screen.getByTestId('DailyCaloricProgress')).toBeVisible()
  expect(screen.getByTestId('DailyCaloricProgress')).toHaveAttribute(
    'style',
    'width: 50%; background-color: lime;'
  )
})

test('Dipslays full red bar if exceded the daily caloric target', () => {
  render(<DailyCaloricProgress percentage={120} />)

  expect(screen.getByTestId('DailyCaloricProgress')).toHaveAttribute(
    'style',
    'width: 100%; background-color: red;'
  )
})

test('Displays notthing if percentage is null', () => {
  render(<DailyCaloricProgress percentage={null} />)

  expect(screen.queryByTestId('DailyCaloricProgress')).not.toBeInTheDocument()
})

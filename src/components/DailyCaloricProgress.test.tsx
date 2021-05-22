import { render, screen } from '@testing-library/react'

import StoreProvider from 'store'
import DailyCaloricProgress from 'components/DailyCaloricProgress'

const initialState = { days: [], settings: { dailyCaloricTarget: 2000, darkMode: true } }

test('Displays daily caloric progress', () => {
  render(
    <StoreProvider initialState={initialState}>
      <DailyCaloricProgress kcal={1000} />
    </StoreProvider>
  )

  expect(screen.getByTestId('DailyCaloricProgress')).toBeVisible()
  expect(screen.getByTestId('DailyCaloricProgress')).toHaveStyle(
    'width: 50%; height: 10px; background-color: var(--green);'
  )
})

test('Dipslays full red bar if exceded the daily caloric target', () => {
  render(
    <StoreProvider initialState={initialState}>
      <DailyCaloricProgress kcal={2200} />
    </StoreProvider>
  )

  expect(screen.getByTestId('DailyCaloricProgress')).toHaveStyle(
    'width: 100%; height: 10px; background-color: var(--red);'
  )
})

test('Displays nothing if calories is 0', () => {
  render(
    <StoreProvider initialState={initialState}>
      <DailyCaloricProgress kcal={0} />
    </StoreProvider>
  )

  expect(screen.getByTestId('DailyCaloricProgress')).toHaveStyle('width: 0%; height: 10px;')
})

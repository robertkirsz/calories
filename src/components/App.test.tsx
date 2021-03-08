import { render, screen, fireEvent } from '@testing-library/react'

import type { DayInterface, StoreStateInterface } from 'types'

import mockDays from 'days.json'
import defaultSettings from 'defaultSettings'
import StoreProvider from 'store'
import App from 'components/App'

function AppToTest({ initialState }: { initialState: StoreStateInterface }) {
  return (
    <StoreProvider initialState={initialState}>
      <App />
    </StoreProvider>
  )
}

describe('Clear state', () => {
  test('Day can be added', () => {
    render(<AppToTest initialState={{ days: [], settings: defaultSettings }} />)

    expect(screen.queryAllByTestId('Day')).toHaveLength(0)
    fireEvent.click(screen.getByText('New day'))
    expect(screen.getAllByTestId('Day')).toHaveLength(1)
  })
})

describe('Existing data', () => {
  test('Has everything in place', () => {
    render(
      <AppToTest initialState={{ days: mockDays as DayInterface[], settings: defaultSettings }} />
    )

    expect(screen.getByText('New day')).toBeInTheDocument()
    expect(screen.getAllByTestId('Day')).toHaveLength(6)
    expect(screen.getAllByTestId('Activity')).toHaveLength(12)
  })
})

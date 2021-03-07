import { render, screen, fireEvent } from '@testing-library/react'

import type { DayInterface } from 'types'

import mockDays from 'days.json'
import App from 'components/App'

describe('Clear state', () => {
  test('Day can be added', () => {
    render(<App initialDays={[]} />)

    expect(screen.queryAllByTestId('Day')).toHaveLength(0)
    fireEvent.click(screen.getByText('New day'))
    expect(screen.getAllByTestId('Day')).toHaveLength(1)
  })
})

describe('Existing data', () => {
  const initialDays = mockDays as DayInterface[]

  test('Renders button for adding new days', () => {
    render(<App initialDays={initialDays} />)
    const addDayButton = screen.getByText('New day')
    expect(addDayButton).toBeInTheDocument()
  })

  test('Renders days list', () => {
    render(<App initialDays={initialDays} />)
    const daysList = screen.getAllByTestId('Day')
    expect(daysList).toHaveLength(6)
  })

  test('Renders activities list', () => {
    render(<App initialDays={initialDays} />)
    const activitiesList = screen.getAllByTestId('Activity')
    expect(activitiesList).toHaveLength(12)
  })
})

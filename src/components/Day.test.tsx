import { render, screen, fireEvent } from '@testing-library/react'

import type { DayInterface, ActivityInterface } from 'types'

import Day from 'components/Day'

jest.mock('uuid', () => ({ v4: () => 'mocked-id' }))

// TODO: move somewhere else
const withFade = (firedEvent: boolean, index = 0) => {
  fireEvent.animationEnd(screen.getAllByTestId('Fade')[index])
}

const activity: ActivityInterface = {
  id: 'some-id',
  type: 'gramsOfKcal',
  name: 'Pizza',
  consumedGrams: 50,
  kcalPer100g: 200,
  consumedKcal: 0,
}

const day: DayInterface = {
  id: 'some-id',
  date: '1987-06-01',
  activities: [activity],
}

it('All texts and interactive elements are in place', () => {
  render(<Day day={day} />)

  expect(screen.getByTestId('Day')).toBeVisible()
  expect(screen.getByTestId('Day date')).toHaveTextContent('01-06-1987')
  expect(screen.getByTestId('Day total kcal consumed')).toHaveTextContent('100 kcal')
  expect(screen.getByTestId('Day MenuButton')).toBeVisible()
  expect(screen.getByTestId('Activity')).toBeVisible()
  expect(screen.getByTestId('AddActivityModal button')).toBeVisible()
})

// TODO: doesn't work because it's not using store
// it('Can be collapsed', () => {
//   render(<Day day={day} />)

//   fireEvent.click(screen.getByTestId('Day MenuButton'))
//   fireEvent.animationEnd(screen.getByTestId('Fade'))
//   fireEvent.click(screen.getByTestId('Day collapse button'))
//   fireEvent.animationEnd(screen.getByTestId('Fade'))

//   expect(screen.getByTestId('Activity')).not.toBeInTheDocument()
// })

it('Callbacks work', () => {
  render(<Day day={day} />)

  // --------------------------
  /* These should be moved somewhere else perhaps */
  expect(screen.queryByTestId('ConfirmationModal')).not.toBeInTheDocument()

  withFade(fireEvent.click(screen.getByTestId('Day MenuButton')))
  fireEvent.click(screen.getByTestId('Day delete button'))
  expect(screen.getByTestId('ConfirmationModal')).toBeVisible()
  withFade(fireEvent.click(screen.getByTestId('ConfirmationModal yes button')), 1)
  expect(screen.queryByTestId('ConfirmationModal')).not.toBeInTheDocument()

  // expect(screen.getAllByTestId('Activity')).toHaveLength(1)
  expect(screen.queryByTestId('AddActivityModal')).not.toBeInTheDocument()
  withFade(fireEvent.click(screen.getByTestId('AddActivityModal button')))
  expect(screen.getByTestId('AddActivityModal')).toBeVisible()
  withFade(fireEvent.submit(screen.getByTestId('ActivityForm')))
  expect(screen.queryByTestId('AddActivityModal')).not.toBeInTheDocument()
  // expect(screen.getAllByTestId('Activity')).toHaveLength(2)
  // --------------------------
})

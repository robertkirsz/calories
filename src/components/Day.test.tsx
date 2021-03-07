import { render, screen, fireEvent } from '@testing-library/react'

import type { DayInterface, ActivityInterface } from '../types'

import Day from './Day'

jest.mock('uuid', () => ({ v4: () => 'mocked-id' }))

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
  render(
    <Day
      day={day}
      onDeleteDay={() => {}}
      onAddActivity={() => {}}
      onEditActivity={() => {}}
      onDeleteActivity={() => {}}
    />
  )

  expect(screen.getByTestId('Day')).toBeVisible()
  expect(screen.getByTestId('Day date')).toHaveTextContent('01-06-1987')
  expect(screen.getByTestId('Day total kcal consumed')).toHaveTextContent('100 kcal')
  expect(screen.getByTestId('Day delete button')).toBeVisible()
  expect(screen.getByTestId('Activity')).toBeVisible()
  expect(screen.getByTestId('AddActivityModal button')).toBeVisible()
})

it('Callbacks work', async () => {
  const deleteDayCallback = jest.fn()
  const addActivityCallback = jest.fn()
  const editActivityCallback = jest.fn()
  const deleteActivityCallback = jest.fn()

  render(
    <Day
      day={day}
      onDeleteDay={deleteDayCallback}
      onAddActivity={addActivityCallback}
      onEditActivity={editActivityCallback}
      onDeleteActivity={deleteActivityCallback}
    />
  )

  expect(screen.queryByTestId('Delete confirmation modal')).not.toBeInTheDocument()
  fireEvent.click(screen.getByTestId('Day delete button'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.getByTestId('Delete confirmation modal')).toBeVisible()
  fireEvent.click(screen.getByTestId('Delete confirmation modal yes button'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.queryByTestId('Delete confirmation modal')).not.toBeInTheDocument()

  expect(deleteDayCallback).toBeCalledWith('some-id')

  expect(screen.queryByTestId('AddActivityModal')).not.toBeInTheDocument()
  fireEvent.click(screen.getByTestId('AddActivityModal button'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.getByTestId('AddActivityModal')).toBeVisible()
  fireEvent.submit(screen.getByTestId('ActivityForm'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.queryByTestId('AddActivityModal')).not.toBeInTheDocument()

  expect(addActivityCallback).toBeCalledWith('some-id', {
    id: 'mocked-id',
    type: 'gramsOfKcal',
    name: '',
    consumedGrams: 0,
    kcalPer100g: 0,
    consumedKcal: 0,
  })

  expect(screen.queryByTestId('EditActivityModal')).not.toBeInTheDocument()
  fireEvent.click(screen.getByTestId('EditActivityModal button'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.getByTestId('EditActivityModal')).toBeVisible()
  fireEvent.submit(screen.getByTestId('ActivityForm'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.queryByTestId('EditActivityModal')).not.toBeInTheDocument()

  expect(editActivityCallback).toBeCalledWith('some-id', {
    id: 'some-id',
    type: 'gramsOfKcal',
    name: 'Pizza',
    consumedGrams: 50,
    kcalPer100g: 200,
    consumedKcal: 0,
  })

  expect(screen.queryByTestId('Delete confirmation modal')).not.toBeInTheDocument()
  fireEvent.click(screen.getByTestId('Activity delete button'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.getByTestId('Delete confirmation modal')).toBeVisible()
  fireEvent.click(screen.getByTestId('Delete confirmation modal yes button'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.queryByTestId('Delete confirmation modal')).not.toBeInTheDocument()

  expect(deleteActivityCallback).toBeCalledWith('some-id', 'some-id')
})

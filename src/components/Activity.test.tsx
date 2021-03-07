import { render, screen, fireEvent } from '@testing-library/react'

import type { ActivityInterface } from '../types'

import Activity, { getTotalCalories } from './Activity'

const gramsOfKcalActivity: ActivityInterface = {
  id: 'some-id',
  type: 'gramsOfKcal',
  name: 'Pizza',
  consumedGrams: 50,
  kcalPer100g: 200,
  consumedKcal: 0,
}

const onlyKcalActivity: ActivityInterface = {
  id: 'some-id',
  type: 'onlyKcal',
  name: '',
  consumedGrams: 0,
  kcalPer100g: 0,
  consumedKcal: 100,
}

it('All interactive elements are in place', () => {
  const editCallback = jest.fn()
  const deleteCallback = jest.fn()

  render(
    <Activity
      activity={gramsOfKcalActivity}
      onEditActivity={editCallback}
      onDeleteActivity={deleteCallback}
    />
  )

  expect(screen.getByTestId('Activity')).toBeVisible()
  expect(screen.getByTestId('Activity delete button')).toBeVisible()
  expect(screen.getByTestId('EditActivityModal button')).toBeVisible()
})

it('Properly displays "gramsOfKcal" activity type', () => {
  const editCallback = jest.fn()
  const deleteCallback = jest.fn()

  render(
    <Activity
      activity={gramsOfKcalActivity}
      onEditActivity={editCallback}
      onDeleteActivity={deleteCallback}
    />
  )

  expect(screen.getByTestId('Activity name')).toHaveTextContent(gramsOfKcalActivity.name)
  expect(screen.getByTestId('Activity calories')).toHaveTextContent(
    String(getTotalCalories(gramsOfKcalActivity))
  )
  expect(screen.getByTestId('Activity details')).toHaveTextContent(
    `(${gramsOfKcalActivity.consumedGrams} g x ${gramsOfKcalActivity.kcalPer100g} kcal/100g)`
  )
})

it('Properly displays "onlyKcal" activity type', () => {
  const editCallback = jest.fn()
  const deleteCallback = jest.fn()

  render(
    <Activity
      activity={onlyKcalActivity}
      onEditActivity={editCallback}
      onDeleteActivity={deleteCallback}
    />
  )

  expect(screen.queryByTestId('Activity name')).not.toBeInTheDocument()
  expect(screen.getByTestId('Activity calories')).toHaveTextContent(
    String(getTotalCalories(onlyKcalActivity))
  )
  expect(screen.queryByTestId('Activity details')).not.toBeInTheDocument()
})

it('Callbacks work', () => {
  const editCallback = jest.fn()
  const deleteCallback = jest.fn()

  render(
    <Activity
      activity={gramsOfKcalActivity}
      onEditActivity={editCallback}
      onDeleteActivity={deleteCallback}
    />
  )

  fireEvent.click(screen.getByTestId('Activity delete button'))
  fireEvent.click(screen.getByTestId('Delete confirmation modal yes button'))

  expect(deleteCallback).toBeCalledWith(gramsOfKcalActivity.id)

  fireEvent.click(screen.getByTestId('EditActivityModal button'))
  fireEvent.click(screen.getByTestId('ActivityForm submit button'))

  expect(editCallback).toBeCalledWith(gramsOfKcalActivity)
})

it('Total calories are calculated propery', () => {
  expect(getTotalCalories(gramsOfKcalActivity)).toEqual(100)
  expect(getTotalCalories(onlyKcalActivity)).toEqual(100)
})

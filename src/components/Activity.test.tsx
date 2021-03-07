import { render, screen, fireEvent } from '@testing-library/react'

import type { ActivityInterface } from 'types'

import Activity, { getTotalCalories } from 'components/Activity'

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
  render(
    <Activity
      activity={gramsOfKcalActivity}
      onEditActivity={() => {}}
      onDeleteActivity={() => {}}
    />
  )

  expect(screen.getByTestId('Activity')).toBeVisible()
  expect(screen.getByTestId('Activity delete button')).toBeVisible()
  expect(screen.getByTestId('EditActivityModal button')).toBeVisible()
})

it('Properly displays "gramsOfKcal" activity type', () => {
  render(
    <Activity
      activity={gramsOfKcalActivity}
      onEditActivity={() => {}}
      onDeleteActivity={() => {}}
    />
  )

  expect(screen.getByTestId('Activity name')).toHaveTextContent(gramsOfKcalActivity.name)
  expect(screen.getByTestId('Activity calories')).toHaveTextContent('100 kcal')
  expect(screen.getByTestId('Activity details')).toHaveTextContent('(50 g x 200 kcal/100g)')
})

it('Properly displays "onlyKcal" activity type', () => {
  render(
    <Activity activity={onlyKcalActivity} onEditActivity={() => {}} onDeleteActivity={() => {}} />
  )

  expect(screen.queryByTestId('Activity name')).not.toBeInTheDocument()
  expect(screen.getByTestId('Activity calories')).toHaveTextContent('100 kcal')
  expect(screen.queryByTestId('Activity details')).not.toBeInTheDocument()
})

it('Callbacks work', async () => {
  const editCallback = jest.fn()
  const deleteCallback = jest.fn()

  render(
    <Activity
      activity={gramsOfKcalActivity}
      onEditActivity={editCallback}
      onDeleteActivity={deleteCallback}
    />
  )

  expect(screen.queryByTestId('Delete confirmation modal')).not.toBeInTheDocument()
  fireEvent.click(screen.getByTestId('Activity delete button'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.getByTestId('Delete confirmation modal')).toBeVisible()
  fireEvent.click(screen.getByTestId('Delete confirmation modal yes button'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.queryByTestId('Delete confirmation modal')).not.toBeInTheDocument()

  expect(deleteCallback).toBeCalledWith(gramsOfKcalActivity.id)

  expect(screen.queryByTestId('EditActivityModal')).not.toBeInTheDocument()
  fireEvent.click(screen.getByTestId('EditActivityModal button'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.getByTestId('EditActivityModal')).toBeVisible()
  fireEvent.click(screen.getByTestId('ActivityForm submit button'))
  fireEvent.animationEnd(screen.getByTestId('Fade'))
  expect(screen.queryByTestId('EditActivityModal')).not.toBeInTheDocument()

  expect(editCallback).toBeCalledWith(gramsOfKcalActivity)
})

it('Total calories are calculated propery', () => {
  expect(getTotalCalories(gramsOfKcalActivity)).toEqual(100)
  expect(getTotalCalories(onlyKcalActivity)).toEqual(100)
})

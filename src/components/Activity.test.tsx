import { render, screen, fireEvent } from '@testing-library/react'

import type { ActivityInterface } from 'types'

import Activity, { getTotalCalories } from 'components/Activity'

// TODO: move somewhere else
const withFade = (firedEvent: boolean, index = 0) => {
  fireEvent.animationEnd(screen.getAllByTestId('Fade')[index])
}

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
  render(<Activity activity={gramsOfKcalActivity} dayId="some-id" />)

  expect(screen.getByTestId('Activity')).toBeVisible()
  expect(screen.getByTestId('ActivityMenu button')).toBeVisible()
})

it('Properly displays "gramsOfKcal" activity type', () => {
  render(<Activity activity={gramsOfKcalActivity} dayId="some-id" />)

  expect(screen.getByTestId('Activity name')).toHaveTextContent(gramsOfKcalActivity.name)
  expect(screen.getByTestId('Activity calories')).toHaveTextContent('100 kcal')
  expect(screen.getByTestId('Activity details')).toHaveTextContent('(50 g x 200 kcal/100g)')
})

it('Properly displays "onlyKcal" activity type', () => {
  render(<Activity activity={onlyKcalActivity} dayId="some-id" />)

  expect(screen.queryByTestId('Activity name')).not.toBeInTheDocument()
  expect(screen.getByTestId('Activity calories')).toHaveTextContent('100 kcal')
  expect(screen.queryByTestId('Activity details')).not.toBeInTheDocument()
})

it('Callbacks work', () => {
  render(<Activity activity={gramsOfKcalActivity} dayId="some-id" />)

  // Not sure about these tests, they don't test much
  expect(screen.queryByTestId('ActivityMenu modal')).not.toBeInTheDocument()
  withFade(fireEvent.click(screen.getByTestId('ActivityMenu button')))
  expect(screen.getByTestId('ActivityMenu modal')).toBeVisible()
  withFade(fireEvent.submit(screen.getByTestId('ActivityForm')))
  expect(screen.queryByTestId('ActivityMenu modal')).not.toBeInTheDocument()

  expect(screen.queryByTestId('ActivityMenu modal')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ConfirmationModal')).not.toBeInTheDocument()
  withFade(fireEvent.click(screen.getByTestId('ActivityMenu button')))
  expect(screen.getByTestId('ActivityMenu modal')).toBeVisible()
  fireEvent.click(screen.getByTestId('ActivityMenu delete button'))
  expect(screen.getByTestId('ConfirmationModal')).toBeVisible()
  withFade(fireEvent.click(screen.getByTestId('ConfirmationModal yes button')))
  expect(screen.queryByTestId('ConfirmationModal')).not.toBeInTheDocument()
  expect(screen.queryByTestId('ActivityMenu modal')).not.toBeInTheDocument()
})

it('Total calories are calculated propery', () => {
  expect(getTotalCalories(gramsOfKcalActivity)).toEqual(100)
  expect(getTotalCalories(onlyKcalActivity)).toEqual(100)
})

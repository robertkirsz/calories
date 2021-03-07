import { render, screen, fireEvent } from '@testing-library/react'

import ActivityForm from './ActivityForm'

jest.mock('uuid', () => ({ v4: () => 'mocked-id' }))

describe('Add new activity', () => {
  it('All important elements are in place', () => {
    render(<ActivityForm />)

    expect(screen.getByTestId('ActivityForm')).toBeVisible()

    expect(screen.getByTestId('ActivityForm name input')).toBeVisible()
    expect(screen.getByTestId('ActivityForm gramsOfKcal radio')).toBeVisible()
    expect(screen.getByTestId('ActivityForm consumedGrams input')).toBeVisible()
    expect(screen.getByTestId('ActivityForm kcalPer100g input')).toBeVisible()
    expect(screen.getByTestId('ActivityForm onlyKcal radio')).toBeVisible()
    expect(screen.getByTestId('ActivityForm consumedKcal input')).toBeVisible()
    expect(screen.getByTestId('ActivityForm submit button')).toBeVisible()
    expect(screen.getByTestId('ActivityForm cancel button')).toBeVisible()

    expect(screen.getByTestId('ActivityForm gramsOfKcal radio')).toBeChecked()
    expect(screen.getByTestId('ActivityForm onlyKcal radio')).not.toBeChecked()
  })

  fit('Default submit values look like expected', () => {
    const submitCallback = jest.fn()

    render(<ActivityForm onSubmit={submitCallback} />)

    expect(screen.getByTestId('ActivityForm name input')).not.toHaveValue()
    expect(screen.getByTestId('ActivityForm consumedGrams input')).not.toHaveValue()
    expect(screen.getByTestId('ActivityForm kcalPer100g input')).not.toHaveValue()

    fireEvent.submit(screen.getByTestId('ActivityForm'))

    expect(submitCallback).toBeCalledWith({
      id: 'mocked-id',
      type: 'gramsOfKcal',
      name: '',
      consumedGrams: 0,
      kcalPer100g: 0,
      consumedKcal: 0,
    })
  })

  it('Data for "gramsOfKcal" activity is returned correctly', () => {
    const submitCallback = jest.fn()

    render(<ActivityForm onSubmit={submitCallback} />)

    const nameInput = screen.getByTestId('ActivityForm name input')
    const consumedGramsInput = screen.getByTestId('ActivityForm consumedGrams input')
    const kcalPer100gInput = screen.getByTestId('ActivityForm kcalPer100g input')

    fireEvent.change(nameInput, { target: { value: 'Pizza' } })
    fireEvent.change(consumedGramsInput, { target: { value: '50' } })
    fireEvent.change(kcalPer100gInput, { target: { value: '200' } })

    expect(nameInput).toHaveValue('Pizza')
    expect(consumedGramsInput).toHaveValue(50)
    expect(kcalPer100gInput).toHaveValue(200)

    fireEvent.submit(screen.getByTestId('ActivityForm'))

    expect(submitCallback).toBeCalledWith({
      id: 'mocked-id',
      type: 'gramsOfKcal',
      name: 'Pizza',
      consumedGrams: 50,
      kcalPer100g: 200,
      consumedKcal: 0,
    })
  })

  it('Data for "onlyKcal" activity is returned correctly', () => {
    const submitCallback = jest.fn()

    render(<ActivityForm onSubmit={submitCallback} />)

    const nameInput = screen.getByTestId('ActivityForm name input')
    const consumedKcalInput = screen.getByTestId('ActivityForm consumedKcal input')

    fireEvent.click(screen.getByTestId('ActivityForm onlyKcal radio'))
    fireEvent.change(nameInput, { target: { value: 'Pizza' } })
    fireEvent.change(consumedKcalInput, { target: { value: '100' } })

    expect(nameInput).toHaveValue('Pizza')
    expect(consumedKcalInput).toHaveValue(100)

    fireEvent.submit(screen.getByTestId('ActivityForm'))

    expect(submitCallback).toBeCalledWith({
      id: 'mocked-id',
      type: 'onlyKcal',
      name: 'Pizza',
      consumedGrams: 0,
      kcalPer100g: 0,
      consumedKcal: 100,
    })
  })

  it('Cancel callback is called', () => {
    const cancelCallback = jest.fn()

    render(<ActivityForm onCancel={cancelCallback} />)

    fireEvent.click(screen.getByTestId('ActivityForm cancel button'))

    expect(cancelCallback).toBeCalled()
  })
})

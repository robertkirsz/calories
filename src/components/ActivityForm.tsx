import { useState } from 'react'
import 'styled-components/macro'
import { v4 as uuid } from 'uuid'

import type { ActivityInterface, ActivityType } from 'types'

import Div from 'components/Div'

type Props = {
  initialData?: ActivityInterface
  onSubmit?: (formData: ActivityInterface) => void
  onCancel?: () => void
}

export default function ActivityForm({ initialData, onSubmit, onCancel }: Props) {
  const [type, setType] = useState<ActivityType>(initialData?.type || 'gramsOfKcal')
  const [name, setName] = useState(initialData?.name || '')
  const [consumedGrams, setConsumedGrams] = useState(String(initialData?.consumedGrams || ''))
  const [kcalPer100g, setKcalPer100g] = useState(String(initialData?.kcalPer100g || ''))
  const [consumedKcal, setConsumedKcal] = useState(String(initialData?.consumedKcal || ''))

  if (name === null) console.log('name', String(name))
  if (consumedGrams === null) console.log('consumedGrams', String(consumedGrams))
  if (kcalPer100g === null) console.log('kcalPer100g', String(kcalPer100g))
  if (consumedKcal === null) console.log('consumedKcal', String(consumedKcal))

  function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setType(event.currentTarget.value as ActivityType)
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData: ActivityInterface = {
      id: initialData?.id || uuid(),
      type,
      name,
      consumedGrams: parseInt(consumedGrams || '0'),
      kcalPer100g: parseInt(kcalPer100g || '0'),
      consumedKcal: parseInt(consumedKcal || '0'),
    }

    // User may have filled in all the fields, but we need to clear those not connected to the chosen type
    if (type === 'gramsOfKcal') {
      formData.consumedKcal = 0
    }

    if (type === 'onlyKcal') {
      formData.consumedGrams = 0
      formData.kcalPer100g = 0
    }

    onSubmit?.(formData)
  }

  return (
    <Div as="form" columnTop={16} width={240} onSubmit={submit} data-testid="ActivityForm">
      <input
        name="name"
        placeholder="Optional name of meal or activity"
        value={name}
        onChange={event => setName(event.target.value)}
        data-testid="ActivityForm name input"
      />

      <Div listLeft itemsBaseline>
        <input
          type="radio"
          name="type"
          value="gramsOfKcal"
          onChange={handleTypeChange}
          checked={type === 'gramsOfKcal'}
          data-testid="ActivityForm gramsOfKcal radio"
        />

        <Div
          block
          opacity={type !== 'gramsOfKcal' ? 0.25 : undefined}
          noPointerEvents={type !== 'gramsOfKcal'}
        >
          <span>I ate</span>
          <input
            type="number"
            name="consumedGrams"
            value={consumedGrams}
            onChange={event => setConsumedGrams(event.target.value)}
            data-testid="ActivityForm consumedGrams input"
            css="width: 32px; margin: 0 4px;"
          />
          <span>grams of food that has</span>
          <input
            type="number"
            name="kcalPer100g"
            value={kcalPer100g}
            onChange={event => setKcalPer100g(event.target.value)}
            data-testid="ActivityForm kcalPer100g input"
            css="width: 32px; margin: 0 4px;"
          />
          <span>kcal per 100 gram</span>
        </Div>
      </Div>

      <Div listLeft itemsBaseline>
        <input
          type="radio"
          name="type"
          value="onlyKcal"
          onChange={handleTypeChange}
          checked={type === 'onlyKcal'}
          data-testid="ActivityForm onlyKcal radio"
        />

        <Div
          block
          opacity={type !== 'onlyKcal' ? 0.25 : undefined}
          noPointerEvents={type !== 'onlyKcal'}
        >
          <span>I consumed</span>
          <input
            type="number"
            name="consumedKcal"
            value={consumedKcal}
            onChange={event => setConsumedKcal(event.target.value)}
            data-testid="ActivityForm consumedKcal input"
            css="width: 32px; margin: 0 4px;"
          />
          <span>kcal</span>
          <br />
          <small>Use negative value if you burned calories instead</small>
        </Div>
      </Div>

      <Div listLeft justifyCenter>
        <button data-testid="ActivityForm submit button">Submit</button>
        <button type="button" onClick={onCancel} data-testid="ActivityForm cancel button">
          Cancel
        </button>
      </Div>
    </Div>
  )
}

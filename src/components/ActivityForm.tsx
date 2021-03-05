import { useState } from 'react'
import 'styled-components/macro'

import type { ActivityType } from 'types'

import Div from 'components/Div'

interface FormDataInterface {
  type: ActivityType
  consumedGrams: number | null
  kcalPer100g: number | null
  consumedKcal: number | null
  name: string
}

type Props = {
  onSubmit: (formData: FormDataInterface) => void
  onCancel: () => void
}

export default function ActivityForm({ onSubmit, onCancel }: Props) {
  const [type, setType] = useState<ActivityType>('gramsOfKcal')
  const [consumedGrams, setConsumedGrams] = useState('')
  const [kcalPer100g, setKcalPer100g] = useState('')
  const [consumedKcal, setConsumedKcal] = useState('')
  const [name, setName] = useState('')

  function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setType(event.currentTarget.value as ActivityType)
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData: FormDataInterface = {
      type,
      name,
      consumedGrams: parseInt(consumedGrams),
      kcalPer100g: parseInt(kcalPer100g),
      consumedKcal: parseInt(consumedKcal)
    }

    if (type === 'gramsOfKcal') {
      formData.consumedKcal = null
    }

    if (type === 'onlyKcal') {
      formData.consumedGrams = null
      formData.kcalPer100g = null
    }

    onSubmit(formData)
  }

  return (
    <Div as="form" columnTop={16} width={240} onSubmit={submit}>
      <Div listLeft itemsBaseline>
        <input
          type="radio"
          name="drone"
          value="gramsOfKcal"
          onChange={handleTypeChange}
          checked={type === 'gramsOfKcal'}
        />

        <Div
          block
          opacity={type !== 'gramsOfKcal' ? 0.25 : undefined}
          noPointerEvents={type !== 'gramsOfKcal'}
        >
          <span>I ate</span>
          <input
            value={consumedGrams}
            onChange={event => setConsumedGrams(event.target.value)}
            css="width: 32px; margin: 0 4px;"
          />
          <span>grams of food that has</span>
          <input
            value={kcalPer100g}
            onChange={event => setKcalPer100g(event.target.value)}
            css="width: 32px; margin: 0 4px;"
          />
          <span>kcal per 100 gram</span>
        </Div>
      </Div>

      <Div listLeft itemsBaseline>
        <input
          type="radio"
          name="drone"
          value="onlyKcal"
          onChange={handleTypeChange}
          checked={type === 'onlyKcal'}
        />

        <Div
          block
          opacity={type !== 'onlyKcal' ? 0.25 : undefined}
          noPointerEvents={type !== 'onlyKcal'}
        >
          <span>I consumed</span>
          <input
            value={consumedKcal}
            onChange={event => setConsumedKcal(event.target.value)}
            css="width: 32px; margin: 0 4px;"
          />
          <span>kcal</span>
          <br />
          <small>Use negative value if you burned calories instead</small>
        </Div>
      </Div>

      <input
        placeholder="Optional name of meal or activity"
        value={name}
        onChange={event => setName(event.target.value)}
      />

      <Div listLeft justifyCenter>
        <button>Submit</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </Div>
    </Div>
  )
}
import { useState } from 'react'
import dayjs from 'dayjs'

import type { DayInterface } from 'types'

import Modal from 'components/Modal'
import Meal from 'components/Meal'

type Props = {
  day: DayInterface
}

export default function Day({ day }: Props) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const totalKcalConsumed = Math.round(
    day.meals.reduce(
      (all, meal) => all + (meal.kcalPer100g * meal.consumedGrams) / 100,
      0
    )
  )

  return (
    <>
      <div className="day" data-testid="Day">
        <nav>
          <span>{dayjs(day.date).format('DD-MM-YYYY')}</span>
          <span>{totalKcalConsumed} kcal</span>
          <button onClick={() => setShowDeleteConfirmation(true)}>
            Delete
          </button>
        </nav>

        <div className="meals-list">
          {day.meals.map(meal => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </div>

        <button>Add meal</button>
      </div>

      <Modal
        show={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
      >
        Confirm delete!
      </Modal>
    </>
  )
}

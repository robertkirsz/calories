import { useState } from 'react'
import type { MealInterface } from 'types'

import Modal from 'components/Modal'

type Props = {
  meal: MealInterface
}

export default function Meal({ meal }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const consumedKcal = Math.round((meal.kcalPer100g * meal.consumedGrams) / 100)

  return (
    <>
      <div className="meal" data-testid="Meal">
        {meal.name && <span>{meal.name}</span>}
        <div className="values">
          <span>{meal.consumedGrams} g</span>
          <span>{meal.kcalPer100g} kcal</span>
          <span>{consumedKcal} kcal</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      </div>

      <Modal show={isEditing} onClose={() => setIsEditing(false)}>
        Hello!
      </Modal>
    </>
  )
}

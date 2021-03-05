import { useState } from 'react'
import styled from 'styled-components'

import type { MealInterface } from 'types'

import Modal from 'components/Modal'

type Props = {
  meal: MealInterface
}

export default function Meal({ meal }: Props) {
  const [isEditMealModalVisible, setIsEditMealModalVisible] = useState(false)

  // TODO: this is similar to what's in Day, ler's extract the logic and re-use it
  let consumedKcal = 0

  if (meal.type === 'gramsOfKcal') {
    // TODO: make sure these are not null if type === 'gramsOfKcal'
    consumedKcal = Math.round((meal.kcalPer100g! * meal.consumedGrams!) / 100)
  }

  if (meal.type === 'onlyKcal') {
    // TODO: make sure this is not null if type === 'onlyKcal'
    consumedKcal = meal.consumedKcal!
  }

  function toogleEditMealModal() {
    setIsEditMealModalVisible(state => !state)
  }

  return (
    <>
      <div className="meal list-top" data-testid="Meal">
        {meal.name && <span>{meal.name}</span>}
        <div className="values">
          <span>{meal.consumedGrams} g</span>
          <span>{meal.kcalPer100g} kcal</span>
          <span>{consumedKcal} kcal</span>
          <button onClick={toogleEditMealModal}>Edit</button>
        </div>
      </div>

      <Modal show={isEditMealModalVisible} onClose={toogleEditMealModal}>
        <EditMealModal>Edit meal</EditMealModal>
      </Modal>
    </>
  )
}

const EditMealModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > *:not(:first-child) {
    margin-top: 16px;
  }
`

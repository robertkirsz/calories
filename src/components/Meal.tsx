import { useState } from 'react'

import type { MealInterface } from 'types'

import Div from 'components/Div'
import Modal from 'components/Modal'

type Props = {
  meal: MealInterface
  onDeleteActivity: (activityId: MealInterface['id']) => void
}

export default function Meal({ meal, onDeleteActivity }: Props) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  // TODO: this is similar to what's in Day, let's extract the logic and re-use it
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
    setIsEditModalVisible(state => !state)
  }

  function toggleDeleteActivityModal() {
    setIsDeleteModalVisible(state => !state)
  }

  function confirmDelete() {
    toggleDeleteActivityModal()
    onDeleteActivity(meal.id)
  }

  return (
    <>
      <Div justifyBetween itemsCenter border="1px solid" data-testid="Meal">
        <Div columnTop>
          {meal.name !== '' && <span>{meal.name}</span>}

          <Div itemsBaseline>
            <span>{consumedKcal} kcal</span>

            {meal.type === 'gramsOfKcal' && (
              <Div mLeft={8} fontSize="0.8em">
                ({meal.consumedGrams} g x {meal.kcalPer100g} kcal/100g)
              </Div>
            )}
          </Div>
        </Div>

        <Div listLeft>
          <button onClick={toggleDeleteActivityModal}>x</button>
          <button onClick={toogleEditMealModal}>Edit</button>
        </Div>
      </Div>

      <Modal show={isEditModalVisible} onClose={toogleEditMealModal}>
        <Div columnTop={16} itemsCenter>
          Edit meal
        </Div>
      </Modal>

      <Modal show={isDeleteModalVisible} onClose={toggleDeleteActivityModal}>
        <Div columnTop={16} itemsCenter>
          <span>You sure?</span>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={toggleDeleteActivityModal}>No</button>
        </Div>
      </Modal>
    </>
  )
}

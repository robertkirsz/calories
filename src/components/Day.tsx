import { useState } from 'react'
import styled from 'styled-components/macro'
import dayjs from 'dayjs'

import type { DayInterface } from 'types'

import Modal from 'components/Modal'
import Meal from 'components/Meal'

type Props = {
  day: DayInterface
  onDeleteDay: (dayId: DayInterface['id']) => void
}

export default function Day({ day, onDeleteDay }: Props) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  function toggleDeleteConfirmationModal() {
    setShowDeleteConfirmation(state => !state)
  }

  function confirmDeleteDay() {
    toggleDeleteConfirmationModal()
    onDeleteDay(day.id)
  }

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
          <button onClick={toggleDeleteConfirmationModal}>Delete</button>
        </nav>

        <MealsList>
          {day.meals.map(meal => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </MealsList>

        <button>Add meal</button>
      </div>

      <Modal
        show={showDeleteConfirmation}
        onClose={toggleDeleteConfirmationModal}
      >
        <DeleteDayModal>
          <span>You sure?</span>
          <button onClick={confirmDeleteDay}>Yes</button>
          <button onClick={toggleDeleteConfirmationModal}>No</button>
        </DeleteDayModal>
      </Modal>
    </>
  )
}

const MealsList = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:first-child) {
    margin-top: 40px;
  }
`

const DeleteDayModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > *:not(:first-child) {
    margin-top: 16px;
  }
`

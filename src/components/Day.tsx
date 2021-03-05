import { useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

import type { ActivityFormDataInterface, DayInterface } from 'types'

import Modal from 'components/Modal'
import AddActivityModal from 'components/AddActivityModal'
import Meal from 'components/Meal'

type Props = {
  day: DayInterface
  onAddActivity: (
    dayId: DayInterface['id'],
    formData: ActivityFormDataInterface
  ) => void
  onDeleteDay: (dayId: DayInterface['id']) => void
}

export default function Day({ day, onDeleteDay, onAddActivity }: Props) {
  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible
  ] = useState(false)

  function toggleDeleteConfirmationModal() {
    setIsDeleteConfirmationModalVisible(state => !state)
  }

  function addActivity(formData: ActivityFormDataInterface) {
    onAddActivity(day.id, formData)
  }

  function confirmDeleteDay() {
    toggleDeleteConfirmationModal()
    onDeleteDay(day.id)
  }

  const totalKcalConsumed = Math.round(
    day.meals.reduce((all, activity) => {
      if (activity.type === 'gramsOfKcal') {
        // TODO: make sure these are not null if type === 'gramsOfKcal'
        return all + (activity.kcalPer100g! * activity.consumedGrams!) / 100
      }

      if (activity.type === 'onlyKcal') {
        // TODO: make sure this is not null if type === 'onlyKcal'
        return all + activity.consumedKcal!
      }

      return all
    }, 0)
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

        <AddActivityModal onSubmit={addActivity} />
      </div>

      <Modal
        show={isDeleteConfirmationModalVisible}
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
    margin-top: 16px;
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

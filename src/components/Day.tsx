import { useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

import type { ActivityInterface, DayInterface } from 'types'

import Div from 'components/Div'
import Modal from 'components/Modal'
import AddActivityModal from 'components/AddActivityModal'
import Activity from 'components/Activity'

type Props = {
  day: DayInterface
  onAddActivity: (dayId: DayInterface['id'], formData: ActivityInterface) => void
  onEditActivity: (dayId: DayInterface['id'], formData: ActivityInterface) => void
  onDeleteActivity: (dayId: DayInterface['id'], activityId: ActivityInterface['id']) => void
  onDeleteDay: (dayId: DayInterface['id']) => void
}

export default function Day({
  day,
  onDeleteDay,
  onAddActivity,
  onEditActivity,
  onDeleteActivity,
}: Props) {
  const [isDeleteConfirmationModalVisible, setIsDeleteConfirmationModalVisible] = useState(false)

  function toggleDeleteConfirmationModal() {
    setIsDeleteConfirmationModalVisible(state => !state)
  }

  function addActivity(formData: ActivityInterface) {
    onAddActivity(day.id, formData)
  }

  function editActivity(formData: ActivityInterface) {
    onEditActivity(day.id, formData)
  }

  function deleteActivity(activityId: ActivityInterface['id']) {
    onDeleteActivity(day.id, activityId)
  }

  function confirmDeleteDay() {
    toggleDeleteConfirmationModal()
    onDeleteDay(day.id)
  }

  const totalKcalConsumed = Math.round(
    day.activities.reduce((all, activity) => {
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
          <span data-testid="Day date">{dayjs(day.date).format('DD-MM-YYYY')}</span>
          <span data-testid="Day total kcal consumed">{totalKcalConsumed} kcal</span>
          <button data-testid="Day delete button" onClick={toggleDeleteConfirmationModal}>
            Delete
          </button>
        </nav>

        <ActivitysList>
          {day.activities.map(activity => (
            <Activity
              key={activity.id}
              activity={activity}
              onEditActivity={editActivity}
              onDeleteActivity={deleteActivity}
            />
          ))}
        </ActivitysList>

        <AddActivityModal onSubmit={addActivity} />
      </div>

      <Modal show={isDeleteConfirmationModalVisible} onClose={toggleDeleteConfirmationModal}>
        <Div columnTop={16} itemsCenter data-testid="Delete confirmation modal">
          <span>You sure?</span>
          <button data-testid="Delete confirmation modal yes button" onClick={confirmDeleteDay}>
            Yes
          </button>
          <button
            data-testid="Delete confirmation modal no button"
            onClick={toggleDeleteConfirmationModal}
          >
            No
          </button>
        </Div>
      </Modal>
    </>
  )
}

const ActivitysList = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:first-child) {
    margin-top: 16px;
  }
`

import { useState } from 'react'
import dayjs from 'dayjs'

import type { SettingsInterface, ActivityInterface, DayInterface } from 'types'

import Div from 'components/Div'
import Modal from 'components/Modal'
import AddActivityModal from 'components/AddActivityModal'
import Activity, { getTotalCalories } from 'components/Activity'
import DailyCaloricProgress from 'components/DailyCaloricProgress'

type Props = {
  day: DayInterface
  dailyCaloricTarget: SettingsInterface['dailyCaloricTarget']
  onEditActivity: (dayId: DayInterface['id'], formData: ActivityInterface) => void
  onDeleteActivity: (dayId: DayInterface['id'], activityId: ActivityInterface['id']) => void
  onDeleteDay: (dayId: DayInterface['id']) => void
}

export default function Day({
  day,
  dailyCaloricTarget,
  onDeleteDay,
  onEditActivity,
  onDeleteActivity,
}: Props) {
  const [isDeleteConfirmationModalVisible, setIsDeleteConfirmationModalVisible] = useState(false)

  function toggleDeleteConfirmationModal() {
    setIsDeleteConfirmationModalVisible(state => !state)
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
    day.activities.reduce((all, activity) => all + getTotalCalories(activity), 0)
  )

  const dailyCaloricProgressPercentage =
    dailyCaloricTarget > 0 ? Math.round((totalKcalConsumed / dailyCaloricTarget) * 100) : null

  return (
    <>
      <Div columnTop data-testid="Day">
        <DailyCaloricProgress percentage={dailyCaloricProgressPercentage} />

        <Div justifyBetween>
          <span data-testid="Day date">{dayjs(day.date).format('DD-MM-YYYY')}</span>
          <span data-testid="Day total kcal consumed">{totalKcalConsumed} kcal</span>
          <button data-testid="Day delete button" onClick={toggleDeleteConfirmationModal}>
            Delete
          </button>
        </Div>

        <Div columnTop={16}>
          {day.activities.map(activity => (
            <Activity
              key={activity.id}
              activity={activity}
              onEditActivity={editActivity}
              onDeleteActivity={deleteActivity}
            />
          ))}
        </Div>

        <AddActivityModal dayId={day.id} />
      </Div>

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

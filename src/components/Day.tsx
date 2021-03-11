import { useState } from 'react'
import dayjs from 'dayjs'

import type { DayInterface } from 'types'

import { useStore, ActionTypes } from 'store'

import Div from 'components/Div'
import ConfirmationModal from 'components/ConfirmationModal'
import AddActivityModal from 'components/AddActivityModal'
import Activity, { getTotalCalories } from 'components/Activity'
import DailyCaloricProgress from 'components/DailyCaloricProgress'

type Props = {
  day: DayInterface
}

export default function Day({ day }: Props) {
  const {
    state: {
      settings: { dailyCaloricTarget },
    },
    dispatch,
  } = useStore()

  const [isDeleteConfirmationModalVisible, setIsDeleteConfirmationModalVisible] = useState(false)

  function toggleDeleteConfirmationModal() {
    setIsDeleteConfirmationModalVisible(state => !state)
  }

  function confirmDeleteDay() {
    toggleDeleteConfirmationModal()
    dispatch({ type: ActionTypes.deleteDay, payload: day.id })
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
            <Activity key={activity.id} dayId={day.id} activity={activity} />
          ))}
        </Div>

        <AddActivityModal dayId={day.id} />
      </Div>

      <ConfirmationModal
        isVisible={isDeleteConfirmationModalVisible}
        onConfirm={confirmDeleteDay}
        onClose={toggleDeleteConfirmationModal}
      />
    </>
  )
}

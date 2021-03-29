import { useState } from 'react'
import dayjs from 'dayjs'

import type { DayInterface } from 'types'

import { useStore, ActionTypes } from 'store'

import Div from 'components/Div'
import Modal from 'components/Modal'
import MenuButton from 'components/MenuButton'
import DailyCaloricProgress from 'components/DailyCaloricProgress'
import Activity, { getTotalCalories } from 'components/Activity'
import ConfirmationModal from 'components/ConfirmationModal'
import AddActivityModal from 'components/AddActivityModal'

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
  const [isMenuModalVisible, setIsMenuModalVisible] = useState(false)

  function toggleMenuModal() {
    setIsMenuModalVisible(state => !state)
  }

  function toggleDeleteConfirmationModal() {
    setIsDeleteConfirmationModalVisible(state => !state)
  }

  function toggleDayCollapse() {
    toggleMenuModal()
    dispatch({ type: ActionTypes.collapseDay, payload: day.id })
  }

  function confirmDeleteDay() {
    toggleDeleteConfirmationModal()
    toggleMenuModal()
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
          <MenuButton onClick={toggleMenuModal} data-testid="Day MenuButton" />
        </Div>

        {!day.isCollapsed && (
          <>
            <Div columnTop={16}>
              {day.activities.map(activity => (
                <Activity key={activity.id} dayId={day.id} activity={activity} />
              ))}
            </Div>

            <AddActivityModal dayId={day.id} />
          </>
        )}
      </Div>

      <Modal show={isMenuModalVisible} onClose={toggleMenuModal} data-testid="Day menu modal">
        <button data-testid="Day collapse button" onClick={toggleDayCollapse}>
          {day.isCollapsed ? 'Open' : 'Close'}
        </button>

        <button data-testid="Day delete button" onClick={toggleDeleteConfirmationModal}>
          Delete
        </button>
      </Modal>

      <ConfirmationModal
        isVisible={isDeleteConfirmationModalVisible}
        onConfirm={confirmDeleteDay}
        onClose={toggleDeleteConfirmationModal}
      />
    </>
  )
}

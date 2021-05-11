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
  const { dispatch } = useStore()

  const [isDeleteConfirmationModalVisible, setIsDeleteConfirmationModalVisible] = useState(false)
  const [isMenuModalVisible, setIsMenuModalVisible] = useState(false)

  const totalKcalConsumed = Math.round(
    day.activities.reduce((all, activity) => all + getTotalCalories(activity), 0)
  )

  function toggleMenuModal() {
    setIsMenuModalVisible(state => !state)
  }

  function toggleDeleteConfirmationModal() {
    setIsDeleteConfirmationModalVisible(state => !state)
  }

  function toggleDayCollapse(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      dispatch({ type: ActionTypes.collapseDay, payload: day.id })
    }
  }

  function mergeDay() {
    toggleMenuModal()
    dispatch({ type: ActionTypes.mergeDay, payload: day.id })
  }

  function confirmDeleteDay() {
    toggleDeleteConfirmationModal()
    toggleMenuModal()
    dispatch({ type: ActionTypes.deleteDay, payload: day.id })
  }

  return (
    <>
      <Div columnTop data-testid="Day">
        <DailyCaloricProgress kcal={totalKcalConsumed} />

        <Div justifyBetween data-testid="Day collapse button" onClick={toggleDayCollapse}>
          <span data-testid="Day date">{dayjs(day.date).format('DD-MM-YYYY')}</span>
          <span data-testid="Day total kcal consumed">{totalKcalConsumed} kcal</span>
          <MenuButton onClick={toggleMenuModal} data-testid="Day MenuButton" />
        </Div>

        {!day.isCollapsed && (
          <>
            <Div columnTop={16} paddingLeft={16}>
              {day.activities.map(activity => (
                <Activity key={activity.id} dayId={day.id} activity={activity} />
              ))}
            </Div>

            <AddActivityModal dayId={day.id} />
          </>
        )}
      </Div>

      <Modal
        show={isMenuModalVisible}
        onClose={toggleMenuModal}
        data-testid="Day menu modal"
        columnTop={16}
      >
        <button data-testid="Day merge button" onClick={mergeDay}>
          Merge activities
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

import { useState } from 'react'

import type { ActivityInterface, DayInterface } from 'types'

import { useStore, ActionTypes } from 'store'

import Div from 'components/Div'
import Modal from 'components/Modal'
import ConfirmationModal from 'components/ConfirmationModal'
import EditActivityModal from 'components/EditActivityModal'
import MenuButton from 'components/MenuButton'

type Props = {
  activity: ActivityInterface
  dayId: DayInterface['id']
}

export const getTotalCalories = ({
  type,
  kcalPer100g,
  consumedGrams,
  consumedKcal,
}: ActivityInterface) =>
  type === 'onlyKcal' ? consumedKcal : Math.round((kcalPer100g * consumedGrams) / 100)

export default function Activity({ activity, dayId }: Props) {
  const { dispatch } = useStore()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isMenuModalVisible, setIsMenuModalVisible] = useState(false)

  function toggleMenuModal() {
    setIsMenuModalVisible(state => !state)
  }

  function toggleDeleteActivityModal() {
    setIsDeleteModalVisible(state => !state)
  }

  function confirmDelete() {
    toggleDeleteActivityModal()
    toggleMenuModal()
    dispatch({ type: ActionTypes.deleteActivity, payload: { dayId, activityId: activity.id } })
  }

  function editActivity(formData: ActivityInterface) {
    toggleMenuModal()
    dispatch({ type: ActionTypes.editActivity, payload: { dayId, formData } })
  }

  return (
    <>
      <Div justifyBetween itemsCenter border="1px solid" data-testid="Activity">
        <Div columnTop>
          {activity.name !== '' && <span data-testid="Activity name">{activity.name}</span>}

          <Div itemsBaseline>
            <span data-testid="Activity calories">{getTotalCalories(activity)} kcal</span>

            {activity.type === 'gramsOfKcal' && (
              <Div mLeft={8} fontSize="0.8em" data-testid="Activity details">
                ({activity.consumedGrams} g x {activity.kcalPer100g} kcal/100g)
              </Div>
            )}
          </Div>
        </Div>

        <MenuButton onClick={toggleMenuModal} data-testid="Activity MenuButton" />
      </Div>

      <Modal show={isMenuModalVisible} onClose={toggleMenuModal} data-testid="Activity menu modal">
        <Div columnTop>
          <button data-testid="Activity delete button" onClick={toggleDeleteActivityModal}>
            Delete activity
          </button>

          <EditActivityModal activity={activity} onSubmit={editActivity} />
        </Div>
      </Modal>

      <ConfirmationModal
        isVisible={isDeleteModalVisible}
        onConfirm={confirmDelete}
        onClose={toggleDeleteActivityModal}
      />
    </>
  )
}

import { useState } from 'react'

import type { ActivityInterface, DayInterface } from 'types'

import { useStore, ActionTypes } from 'store'

import Modal from 'components/Modal'
import ActivityForm from 'components/ActivityForm'
import MenuButton from 'components/MenuButton'
import ConfirmationModal from 'components/ConfirmationModal'

type Props = {
  dayId: DayInterface['id']
  activity: ActivityInterface
}

export default function ActivityMenu({ dayId, activity }: Props) {
  const { dispatch } = useStore()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  function toggleModalVisibility() {
    setIsModalVisible(state => !state)
  }

  function toggleDeleteActivityModal() {
    setIsDeleteModalVisible(state => !state)
  }

  function confirmDelete() {
    toggleDeleteActivityModal()
    toggleModalVisibility()
    dispatch({ type: ActionTypes.deleteActivity, payload: { dayId, activityId: activity.id } })
  }

  function editActivity(formData: ActivityInterface) {
    dispatch({ type: ActionTypes.editActivity, payload: { dayId, formData } })
    toggleModalVisibility()
  }

  return (
    <>
      <MenuButton onClick={toggleModalVisibility} data-testid="ActivityMenu button" />

      <Modal show={isModalVisible} onClose={toggleModalVisibility} data-testid="ActivityMenu modal">
        <button data-testid="Activity delete button" onClick={toggleDeleteActivityModal}>
          Delete activity
        </button>

        <ConfirmationModal
          isVisible={isDeleteModalVisible}
          onConfirm={confirmDelete}
          onClose={toggleDeleteActivityModal}
        />

        <ActivityForm
          initialData={activity}
          onSubmit={editActivity}
          onCancel={toggleModalVisibility}
        />
      </Modal>
    </>
  )
}

import { useRef, useState } from 'react'

import type { ActivityInterface, ActivityValue, DayInterface } from 'types'

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

  function copyActivity() {
    dispatch({ type: ActionTypes.copyActivity, payload: copiedActivity.current })
    toggleModalVisibility()
  }

  function editActivity(formData: ActivityInterface) {
    dispatch({ type: ActionTypes.editActivity, payload: { dayId, formData } })
    toggleModalVisibility()
  }

  function confirmDelete() {
    toggleDeleteActivityModal()
    toggleModalVisibility()
    dispatch({ type: ActionTypes.deleteActivity, payload: { dayId, activityId: activity.id } })
  }

  // TODO: not sure why state is stale here and I need to use ref instead
  // const [copiedActivity, setCopiedActivity] = useState<ActivityInterface>({ ...activity })
  const copiedActivity = useRef<ActivityInterface>({ ...activity })

  function handleActivityValueChange(name: ActivityValue, value: string) {
    // setCopiedActivity(state => ({ [name]: value, ...state }))
    // @ts-ignore
    copiedActivity.current[name] = value
  }

  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModalVisibility() {
    setIsModalVisible(state => !state)
  }

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  function toggleDeleteActivityModal() {
    setIsDeleteModalVisible(state => !state)
  }

  return (
    <>
      <MenuButton onClick={toggleModalVisibility} data-testid="ActivityMenu button" />

      <Modal show={isModalVisible} onClose={toggleModalVisibility} data-testid="ActivityMenu modal">
        <button data-testid="ActivityMenu copy button" onClick={copyActivity}>
          Copy activity
        </button>

        <button data-testid="ActivityMenu delete button" onClick={toggleDeleteActivityModal}>
          Delete activity
        </button>

        <ConfirmationModal
          isVisible={isDeleteModalVisible}
          onConfirm={confirmDelete}
          onClose={toggleDeleteActivityModal}
        />

        <ActivityForm
          initialData={activity}
          onChange={handleActivityValueChange}
          onSubmit={editActivity}
          onCancel={toggleModalVisibility}
        />
      </Modal>
    </>
  )
}

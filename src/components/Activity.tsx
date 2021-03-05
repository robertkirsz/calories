import { useState } from 'react'

import type { ActivityInterface } from 'types'

import Div from 'components/Div'
import Modal from 'components/Modal'

type Props = {
  activity: ActivityInterface
  onDeleteActivity: (activityId: ActivityInterface['id']) => void
}

export default function Activity({ activity, onDeleteActivity }: Props) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  // TODO: this is similar to what's in Day, let's extract the logic and re-use it
  let consumedKcal = 0

  if (activity.type === 'gramsOfKcal') {
    // TODO: make sure these are not null if type === 'gramsOfKcal'
    consumedKcal = Math.round(
      (activity.kcalPer100g! * activity.consumedGrams!) / 100
    )
  }

  if (activity.type === 'onlyKcal') {
    // TODO: make sure this is not null if type === 'onlyKcal'
    consumedKcal = activity.consumedKcal!
  }

  function toogleEditActivityModal() {
    setIsEditModalVisible(state => !state)
  }

  function toggleDeleteActivityModal() {
    setIsDeleteModalVisible(state => !state)
  }

  function confirmDelete() {
    toggleDeleteActivityModal()
    onDeleteActivity(activity.id)
  }

  return (
    <>
      <Div justifyBetween itemsCenter border="1px solid" data-testid="Activity">
        <Div columnTop>
          {activity.name !== '' && (
            <span data-testid="Activity name">{activity.name}</span>
          )}

          <Div itemsBaseline>
            <span data-testid="Activity calories">{consumedKcal} kcal</span>

            {activity.type === 'gramsOfKcal' && (
              <Div mLeft={8} fontSize="0.8em" data-testid="Activity details">
                ({activity.consumedGrams} g x {activity.kcalPer100g} kcal/100g)
              </Div>
            )}
          </Div>
        </Div>

        <Div listLeft>
          <button
            data-testid="Activity delete button"
            onClick={toggleDeleteActivityModal}
          >
            x
          </button>
          <button
            data-testid="Activity edit button"
            onClick={toogleEditActivityModal}
          >
            Edit
          </button>
        </Div>
      </Div>

      <Modal show={isEditModalVisible} onClose={toogleEditActivityModal}>
        <Div columnTop={16} itemsCenter>
          Edit activity
        </Div>
      </Modal>

      {/* TODO: move confirmation modal to a separate component */}
      <Modal show={isDeleteModalVisible} onClose={toggleDeleteActivityModal}>
        <Div columnTop={16} itemsCenter data-testid="Delete confirmation modal">
          <span>You sure?</span>
          <button
            data-testid="Delete confirmation modal yes button"
            onClick={confirmDelete}
          >
            Yes
          </button>
          <button
            data-testid="Delete confirmation modal no button"
            onClick={toggleDeleteActivityModal}
          >
            No
          </button>
        </Div>
      </Modal>
    </>
  )
}

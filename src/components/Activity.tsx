import { useState } from 'react'

import type { ActivityInterface } from 'types'

import Div from 'components/Div'
import Modal from 'components/Modal'
import EditActivityModal from 'components/EditActivityModal'

type Props = {
  activity: ActivityInterface
  onEditActivity: (formData: ActivityInterface) => void
  onDeleteActivity: (activityId: ActivityInterface['id']) => void
}

export const getTotalCalories = ({
  type,
  kcalPer100g,
  consumedGrams,
  consumedKcal,
}: ActivityInterface) =>
  type === 'onlyKcal' ? consumedKcal : Math.round((kcalPer100g * consumedGrams) / 100)

export default function Activity({ activity, onEditActivity, onDeleteActivity }: Props) {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  function toggleDeleteActivityModal() {
    setIsDeleteModalVisible(state => !state)
  }

  function confirmDelete() {
    toggleDeleteActivityModal()
    onDeleteActivity(activity.id)
  }

  function editActivity(formData: ActivityInterface) {
    onEditActivity(formData)
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

        <Div listLeft>
          <button data-testid="Activity delete button" onClick={toggleDeleteActivityModal}>
            x
          </button>

          <EditActivityModal activity={activity} onSubmit={editActivity} />
        </Div>
      </Div>

      {/* TODO: move confirmation modal to a separate component */}
      <Modal show={isDeleteModalVisible} onClose={toggleDeleteActivityModal}>
        <Div columnTop={16} itemsCenter data-testid="Delete confirmation modal">
          <span>You sure?</span>

          <button data-testid="Delete confirmation modal yes button" onClick={confirmDelete}>
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

import { useState } from 'react'

import type { ActivityInterface } from 'types'

import Modal from 'components/Modal'
import ActivityForm from 'components/ActivityForm'

type Props = {
  activity: ActivityInterface
  onSubmit: (formData: ActivityInterface) => void
}

export default function EditActivityModal({ activity, onSubmit }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModalVisibility() {
    setIsModalVisible(state => !state)
  }

  function submit(formData: ActivityInterface) {
    onSubmit(formData)
    toggleModalVisibility()
  }

  return (
    <>
      <button data-testid="EditActivityModal button" onClick={toggleModalVisibility}>
        Edit
      </button>

      <Modal show={isModalVisible} onClose={toggleModalVisibility} data-testid="EditActivityModal">
        <ActivityForm initialData={activity} onSubmit={submit} onCancel={toggleModalVisibility} />
      </Modal>
    </>
  )
}

import { useState } from 'react'

import type { ActivityFormDataInterface } from 'types'

import Modal from 'components/Modal'
import ActivityForm from 'components/ActivityForm'

type Props = {
  onSubmit: (formData: ActivityFormDataInterface) => void
}

export default function AddActivityModal({ onSubmit }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModalVisibility() {
    setIsModalVisible(state => !state)
  }

  function submit(formData: ActivityFormDataInterface) {
    onSubmit(formData)
    toggleModalVisibility()
  }

  return (
    <>
      <button
        data-testid="AddActivityModal button"
        onClick={toggleModalVisibility}
      >
        +
      </button>

      <Modal show={isModalVisible} onClose={toggleModalVisibility}>
        <ActivityForm onSubmit={submit} onCancel={toggleModalVisibility} />
      </Modal>
    </>
  )
}

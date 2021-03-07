import { useState } from 'react'

import type { ActivityInterface } from 'types'

import Modal from 'components/Modal'
import ActivityForm from 'components/ActivityForm'

type Props = {
  onSubmit: (formData: ActivityInterface) => void
}

export default function AddActivityModal({ onSubmit }: Props) {
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
      <button data-testid="AddActivityModal button" onClick={toggleModalVisibility}>
        +
      </button>

      <Modal show={isModalVisible} onClose={toggleModalVisibility} data-testid="AddActivityModal">
        <ActivityForm onSubmit={submit} onCancel={toggleModalVisibility} />
      </Modal>
    </>
  )
}

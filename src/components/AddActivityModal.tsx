import { useState } from 'react'

import Modal from 'components/Modal'
import ActivityForm from 'components/ActivityForm'

type Props = {
  onSubmit: () => void
}

export default function AddActivityModal({ onSubmit }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModalVisibility() {
    setIsModalVisible(state => !state)
  }

  function submit() {
    onSubmit()
    toggleModalVisibility()
  }

  return (
    <>
      <button onClick={toggleModalVisibility}>+</button>

      <Modal show={isModalVisible} onClose={toggleModalVisibility}>
        <ActivityForm onSubmit={submit} onCancel={toggleModalVisibility} />
      </Modal>
    </>
  )
}

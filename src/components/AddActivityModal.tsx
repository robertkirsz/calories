import Modal from 'components/Modal'
import { useState } from 'react'

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

function ActivityForm({
  onSubmit,
  onCancel
}: {
  onSubmit: () => void
  onCancel: () => void
}) {
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={e => submit(e)}>
      <span>ActivityForm</span>
      <button>Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}

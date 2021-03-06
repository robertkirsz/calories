import { useState } from 'react'
import 'styled-components/macro'

import type { ActivityInterface, DayInterface } from 'types'

import { useStore, ActionTypes } from 'store'

import Modal from 'components/Modal'
import ActivityForm from 'components/ActivityForm'

type Props = {
  dayId: DayInterface['id']
}

export default function AddActivityModal({ dayId }: Props) {
  const { dispatch } = useStore()

  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModalVisibility() {
    setIsModalVisible(state => !state)
  }

  function submit(formData: ActivityInterface) {
    dispatch({ type: ActionTypes.addActivity, payload: { dayId, formData } })
    toggleModalVisibility()
  }

  return (
    <>
      <button
        onClick={toggleModalVisibility}
        css="width: 60px; align-self: center;"
        data-testid="AddActivityModal button"
      >
        +
      </button>

      <Modal show={isModalVisible} onClose={toggleModalVisibility} data-testid="AddActivityModal">
        <ActivityForm onSubmit={submit} onCancel={toggleModalVisibility} />
      </Modal>
    </>
  )
}

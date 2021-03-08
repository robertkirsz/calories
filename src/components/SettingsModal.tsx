import { useState } from 'react'

import { useStore, ActionTypes } from 'store'

import Modal from 'components/Modal'
import Settings from 'components/Settings'

export default function SettingsModal() {
  const {
    state: { settings },
    dispatch,
  } = useStore()

  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModalVisibility() {
    setIsModalVisible(state => !state)
  }

  function changeDailyCaloricTarget(value: number) {
    dispatch({ type: ActionTypes.changeDailyCaloricTarget, payload: value })
  }

  return (
    <>
      <button data-testid="SettingsModal button" onClick={toggleModalVisibility}>
        Settings
      </button>

      <Modal show={isModalVisible} onClose={toggleModalVisibility} data-testid="SettingsModal">
        <Settings settings={settings} onDailyCaloricTargetChange={changeDailyCaloricTarget} />

        <button data-testid="SettingsModal close button" onClick={toggleModalVisibility}>
          Close
        </button>
      </Modal>
    </>
  )
}

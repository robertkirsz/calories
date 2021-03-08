import { useState, useContext } from 'react'

import { StoreContext } from 'store'
import { ActionTypes } from 'reducers'

import Modal from 'components/Modal'
import Settings from 'components/Settings'

export default function SettingsModal() {
  const {
    state: { settings },
    dispatch,
  } = useContext(StoreContext)

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
      </Modal>
    </>
  )
}

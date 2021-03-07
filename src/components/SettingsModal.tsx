import { useState } from 'react'

import Modal from 'components/Modal'
import Settings from 'components/Settings'

import type { SettingsInterface } from 'types'

type Props = {
  settings: SettingsInterface
  onUpdate: (settings: SettingsInterface) => void
}

export default function SettingsModal({ settings, onUpdate }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModalVisibility() {
    setIsModalVisible(state => !state)
  }

  return (
    <>
      <button data-testid="SettingsModal button" onClick={toggleModalVisibility}>
        Settings
      </button>

      <Modal show={isModalVisible} onClose={toggleModalVisibility} data-testid="SettingsModal">
        <Settings settings={settings} onUpdate={onUpdate} />
      </Modal>
    </>
  )
}

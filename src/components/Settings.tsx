import 'styled-components/macro'

import type { SettingsInterface } from 'types'

import defaultSettings from 'defaultSettings'
import Div from 'components/Div'

type Props = {
  settings: SettingsInterface
  onUpdate: (settings: SettingsInterface) => void
}

export default function Settings({ settings = defaultSettings, onUpdate }: Props) {
  function changeDailyCaloricTarget(event: React.ChangeEvent<HTMLInputElement>) {
    onUpdate({
      ...settings,
      dailyCaloricTarget: parseInt(event.target.value) || 0,
    })
  }

  return (
    <Div columnTop data-testid="Settings">
      <Div>
        <span>Daily caloric target:</span>
        <input
          type="number"
          value={settings.dailyCaloricTarget === 0 ? '' : settings.dailyCaloricTarget}
          onChange={changeDailyCaloricTarget}
          css="width: 32px; margin: 0 4px;"
        />
        <span>kcal</span>
      </Div>
    </Div>
  )
}

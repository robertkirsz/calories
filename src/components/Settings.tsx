import 'styled-components/macro'

import type { SettingsInterface } from 'types'

import Div from 'components/Div'

type Props = {
  settings: SettingsInterface
  onDailyCaloricTargetChange: (value: number) => void
}

export default function Settings({ settings, onDailyCaloricTargetChange }: Props) {
  function changeDailyCaloricTarget(event: React.ChangeEvent<HTMLInputElement>) {
    onDailyCaloricTargetChange(parseInt(event.target.value) || 0)
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
          data-testid="Settings dailyCaloricTarget input"
        />
        <span>kcal</span>
      </Div>
    </Div>
  )
}

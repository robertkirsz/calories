import { StrictMode } from 'react'
import { render } from 'react-dom'

import type { SettingsInterface } from 'types'

import { initialDays } from 'reducers/daysReducer'
import 'index.css'
import App from 'components/App'

const initialSettings = JSON.parse(String(localStorage.getItem('settings'))) as SettingsInterface

render(
  <StrictMode>
    <App initialSettings={initialSettings || undefined} initialDays={initialDays || undefined} />
  </StrictMode>,
  document.getElementById('app-root')
)

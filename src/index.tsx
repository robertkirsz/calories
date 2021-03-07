import { StrictMode } from 'react'
import { render } from 'react-dom'

import type { SettingsInterface, DayInterface } from 'types'

import 'index.css'
import App from 'components/App'

const initialDays = JSON.parse(String(localStorage.getItem('days'))) as DayInterface[]
const initialSettings = JSON.parse(String(localStorage.getItem('settings'))) as SettingsInterface

render(
  <StrictMode>
    <App initialSettings={initialSettings || undefined} initialDays={initialDays || undefined} />
  </StrictMode>,
  document.getElementById('app-root')
)

import { StrictMode } from 'react'
import { render } from 'react-dom'

import App from 'components/App'
import 'index.css'

import mockDays from 'days.json'

const days = localStorage.getItem('days')
  ? JSON.parse(localStorage.getItem('days')!)
  : process.env.NODE_ENV === 'development'
  ? mockDays
  : []

render(
  <StrictMode>
    <App initialState={days} />
  </StrictMode>,
  document.getElementById('app-root')
)

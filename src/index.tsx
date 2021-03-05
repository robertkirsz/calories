import { StrictMode } from 'react'
import { render } from 'react-dom'

import App from 'components/App'
import 'index.css'

const days = JSON.parse(localStorage.getItem('days') || '[]')

render(
  <StrictMode>
    <App initialState={days} />
  </StrictMode>,
  document.getElementById('app-root')
)

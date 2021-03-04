import { StrictMode } from 'react'
import { render } from 'react-dom'

import App from 'App'
import 'index.css'
// import reportWebVitals from 'reportWebVitals'

import mockDays from 'days.json'

const days = localStorage.getItem('days')
  ? JSON.parse(localStorage.getItem('days')!)
  : mockDays

render(
  <StrictMode>
    <App initialState={days} />
  </StrictMode>,
  document.getElementById('app-root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()

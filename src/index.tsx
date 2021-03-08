import { StrictMode } from 'react'
import { render } from 'react-dom'

import StoreProvider from 'store'
import App from 'components/App'
import 'index.css'

render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
  document.getElementById('app-root')
)

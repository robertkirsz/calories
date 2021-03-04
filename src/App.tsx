import { useState } from 'react'
import type { DayInterface } from './types'

type Props = {
  initialState: DayInterface[]
}

export default function App({ initialState }: Props) {
  const [days] = useState([...initialState])

  function saveData() {
    localStorage.setItem('days', JSON.stringify(days))
  }

  return (
    <div className="App">
      <button onClick={saveData}>Save</button>
    </div>
  )
}

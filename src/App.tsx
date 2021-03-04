import { useState } from 'react'

import type { DayInterface } from 'types'

import Day from 'Day'

type Props = {
  initialState: DayInterface[]
  autosaveEnabled?: boolean
}

export default function App({ initialState }: Props) {
  const [days] = useState([...initialState])

  function addNewDay() {
    localStorage.setItem('days', JSON.stringify(days))
  }

  function saveData() {
    localStorage.setItem('days', JSON.stringify(days))
  }

  function clearData() {
    localStorage.removeItem('days')
  }

  const showAddNewDayButton = true

  return (
    <>
      {showAddNewDayButton && <button onClick={addNewDay}>New day</button>}
      {days.map(day => (
        <Day key={day.id} day={day} />
      ))}
      <button onClick={saveData}>Save</button>
      <button onClick={clearData}>Clear</button>
    </>
  )
}

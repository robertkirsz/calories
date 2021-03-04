import { useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

import type { DayInterface } from 'types'
import { descendingBy } from 'utils'

import Day from 'components/Day'

type Props = {
  initialState: DayInterface[]
  autosaveEnabled?: boolean
}

export default function App({ initialState }: Props) {
  const [days, setDays] = useState([...initialState])
  const sortedDays = days.sort(descendingBy('date'))

  function saveData() {
    localStorage.setItem('days', JSON.stringify(days))
  }

  function clearData() {
    localStorage.removeItem('days')
  }

  function addNewDay() {}

  function deleteDay(dayId: DayInterface['id']) {
    setDays(days => days.filter(day => day.id !== dayId))
  }

  return (
    <>
      <button
        disabled={dayjs().isSame(sortedDays[0].date, 'day')}
        onClick={addNewDay}
      >
        New day
      </button>

      <DaysList>
        {sortedDays.map(day => (
          <Day key={day.id} day={day} onDeleteDay={deleteDay} />
        ))}
      </DaysList>

      <button onClick={saveData}>Save</button>
      <button onClick={clearData}>Clear</button>
    </>
  )
}

const DaysList = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin: 40px 0;

  > *:not(:first-child) {
    margin-top: 40px;
  }
`

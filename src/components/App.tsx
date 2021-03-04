import { useEffect, useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

import type { DayInterface } from 'types'
import { descendingBy } from 'utils'

import Day from 'components/Day'
import Version from 'components/Version'

type Props = {
  initialState: DayInterface[]
}

export default function App({ initialState }: Props) {
  const [days, setDays] = useState([...initialState])
  const sortedDays = days.sort(descendingBy('date'))

  useEffect(() => {
    localStorage.setItem('days', JSON.stringify(days))
  }, [days])

  function addNewDay() {
    setDays(days => [
      ...days,
      { id: uuid(), date: dayjs().format('YYYY-MM-DD'), meals: [] }
    ])
  }

  function deleteDay(dayId: DayInterface['id']) {
    setDays(days => days.filter(day => day.id !== dayId))
  }

  return (
    <>
      <button
        disabled={
          sortedDays.length !== 0 && dayjs().isSame(sortedDays[0].date, 'day')
        }
        onClick={addNewDay}
      >
        New day
      </button>

      <DaysList>
        {sortedDays.map(day => (
          <Day key={day.id} day={day} onDeleteDay={deleteDay} />
        ))}
      </DaysList>

      {process.env.NODE_ENV === 'development' && (
        <button onClick={() => localStorage.removeItem('days')}>Clear</button>
      )}

      <Version />
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

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

import type {
  DayInterface,
  ActivityFormDataInterface,
  ActivityInterface
} from 'types'

import { descendingBy } from 'utils'

import Div from 'components/Div'
import Day from 'components/Day'

import { version } from '../../package.json'

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
      { id: uuid(), date: dayjs().format('YYYY-MM-DD'), activities: [] }
    ])
  }

  function addActivity(
    dayId: DayInterface['id'],
    formData: ActivityFormDataInterface
  ) {
    setDays(days =>
      days.map(day =>
        day.id !== dayId
          ? day
          : {
              ...day,
              activities: [...day.activities, { id: uuid(), ...formData }]
            }
      )
    )
  }

  function deleteActivity(
    dayId: DayInterface['id'],
    activityId: ActivityInterface['id']
  ) {
    setDays(days =>
      days.map(day =>
        day.id !== dayId
          ? day
          : {
              ...day,
              activities: day.activities.filter(
                activity => activity.id !== activityId
              )
            }
      )
    )
  }

  function deleteDay(dayId: DayInterface['id']) {
    setDays(days => days.filter(day => day.id !== dayId))
  }

  async function loadMockData() {
    import(/* webpackChunkName: 'mock-data' */ 'days.json').then(module => {
      setDays(module.default as DayInterface[])
    })
  }

  function handleClear() {
    setDays([])
  }

  return (
    <>
      <button
        disabled={
          sortedDays.length !== 0 && dayjs().isSame(sortedDays[0].date, 'day')
        }
        onClick={addNewDay}
        data-testid="add-new-day-button"
      >
        New day
      </button>

      <Div columnTop={40} selfStretch margin="16px 0">
        {sortedDays.map(day => (
          <Day
            key={day.id}
            day={day}
            onAddActivity={addActivity}
            onDeleteActivity={deleteActivity}
            onDeleteDay={deleteDay}
          />
        ))}
      </Div>

      <Div listLeft itemsCenter>
        <button onClick={handleClear}>Clear</button>

        {process.env.NODE_ENV === 'development' && (
          <button onClick={loadMockData}>Load mock data</button>
        )}

        <small>v{version}</small>
      </Div>
    </>
  )
}

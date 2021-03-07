import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

import type { SettingsInterface, DayInterface, ActivityInterface } from 'types'

import defaultSettings from 'defaultSettings'
import { descendingBy } from 'utils'

import Div from 'components/Div'
import SettingsModal from 'components/SettingsModal'
import Day from 'components/Day'

import { version } from '../../package.json'

type Props = {
  initialSettings?: SettingsInterface
  initialDays?: DayInterface[]
}

export default function App({ initialSettings = defaultSettings, initialDays = [] }: Props) {
  const [settings, setSettings] = useState(initialSettings)
  const [days, setDays] = useState(initialDays)
  const sortedDays = days.sort(descendingBy('date'))

  useEffect(() => {
    localStorage.setItem('days', JSON.stringify(days))
  }, [days])

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  function addNewDay() {
    setDays(days => [...days, { id: uuid(), date: dayjs().format('YYYY-MM-DD'), activities: [] }])
  }

  function addActivity(dayId: DayInterface['id'], formData: ActivityInterface) {
    setDays(days =>
      days.map(day =>
        day.id !== dayId
          ? day
          : {
              ...day,
              activities: [...day.activities, formData],
            }
      )
    )
  }

  function editActivity(dayId: DayInterface['id'], formData: ActivityInterface) {
    setDays(days =>
      days.map(day =>
        day.id !== dayId
          ? day
          : {
              ...day,
              activities: day.activities.map(activity =>
                activity.id !== formData.id ? activity : formData
              ),
            }
      )
    )
  }

  function deleteActivity(dayId: DayInterface['id'], activityId: ActivityInterface['id']) {
    setDays(days =>
      days.map(day =>
        day.id !== dayId
          ? day
          : {
              ...day,
              activities: day.activities.filter(activity => activity.id !== activityId),
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
      <SettingsModal settings={settings} onUpdate={setSettings} />

      <button
        disabled={sortedDays.length !== 0 && dayjs().isSame(sortedDays[0].date, 'day')}
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
            dailyCaloricTarget={settings.dailyCaloricTarget}
            onAddActivity={addActivity}
            onEditActivity={editActivity}
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

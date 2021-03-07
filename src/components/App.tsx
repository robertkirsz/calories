import { useEffect, useState, useReducer } from 'react'
import dayjs from 'dayjs'

import type { SettingsInterface, DayInterface, ActivityInterface } from 'types'

import defaultSettings from 'defaultSettings'
import { descendingBy } from 'utils'
import daysReducer from 'reducers/daysReducer'

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
  const [days, dispatchDays] = useReducer(daysReducer, initialDays)

  const sortedDays = days.sort(descendingBy('date'))

  useEffect(() => {
    localStorage.setItem('days', JSON.stringify(days))
  }, [days])

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  function addNewDay() {
    dispatchDays({ type: 'addNewDay' })
  }

  function addActivity(dayId: DayInterface['id'], formData: ActivityInterface) {
    dispatchDays({ type: 'addActivity', payload: { dayId, formData } })
  }

  function editActivity(dayId: DayInterface['id'], formData: ActivityInterface) {
    dispatchDays({ type: 'editActivity', payload: { dayId, formData } })
  }

  function deleteActivity(dayId: DayInterface['id'], activityId: ActivityInterface['id']) {
    dispatchDays({ type: 'deleteActivity', payload: { dayId, activityId } })
  }

  function deleteDay(dayId: DayInterface['id']) {
    dispatchDays({ type: 'deleteDay', payload: { dayId } })
  }

  async function loadMockData() {
    import(/* webpackChunkName: 'mock-data' */ 'days.json').then(module => {
      dispatchDays({ type: 'setDays', payload: { days: module.default as DayInterface[] } })
    })
  }

  function handleClear() {
    dispatchDays({ type: 'clearDays' })
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
        {/* TDOD: this (day: DayInterface) should be unnecessary */}
        {sortedDays.map((day: DayInterface) => (
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

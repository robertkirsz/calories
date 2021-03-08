import { useContext } from 'react'
import dayjs from 'dayjs'

import type { DayInterface } from 'types'

import { descendingBy } from 'utils'
import { StoreContext } from 'store'
import { ActionTypes } from 'reducers'

import Div from 'components/Div'
import SettingsModal from 'components/SettingsModal'
import Day from 'components/Day'

import { version } from '../../package.json'

export default function App() {
  const {
    state: { days },
    dispatch,
  } = useContext(StoreContext)

  const sortedDays = days.sort(descendingBy('date'))

  return (
    <>
      <SettingsModal />

      <button
        disabled={sortedDays.length !== 0 && dayjs().isSame(sortedDays[0].date, 'day')}
        onClick={() => dispatch({ type: ActionTypes.addNewDay })}
        data-testid="add-new-day-button"
      >
        New day
      </button>

      <Div columnTop={40} selfStretch margin="16px 0">
        {sortedDays.map(day => (
          <Day key={day.id} day={day} />
        ))}
      </Div>

      <Div listLeft itemsCenter>
        <button onClick={() => dispatch({ type: ActionTypes.clearDays })}>Clear</button>

        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={() => {
              import(/* webpackChunkName: 'mock-data' */ 'days.json').then(module => {
                dispatch({
                  type: ActionTypes.setDays,
                  payload: module.default as DayInterface[],
                })
              })
            }}
          >
            Load mock data
          </button>
        )}

        <small>v{version}</small>
      </Div>
    </>
  )
}

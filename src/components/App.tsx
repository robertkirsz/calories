import dayjs from 'dayjs'

import type { DayInterface } from 'types'

import { descendingBy } from 'utils'
import { useStore, ActionTypes } from 'store'

import Div from 'components/Div'
import SettingsModal from 'components/SettingsModal'
import Day from 'components/Day'

import { version } from '../../package.json'

export default function App() {
  const {
    state: { days, favourites },
    dispatch,
  } = useStore()

  const sortedDays = days.sort(descendingBy('date'))

  return (
    <>
      <Div selfStretch itemsCenter justifyBetween listLeft>
        <small>v{version}</small>

        <button
          disabled={sortedDays.length !== 0 && dayjs().isSame(sortedDays[0].date, 'day')}
          onClick={() => dispatch({ type: ActionTypes.addNewDay })}
          data-testid="add-new-day-button"
        >
          New day
        </button>

        <SettingsModal />
      </Div>

      <Div columnTop={40} selfStretch margin="16px 0">
        {sortedDays.map(day => (
          <Day key={day.id} day={day} />
        ))}
      </Div>

      {process.env.NODE_ENV !== 'production' && (
        <Div listLeft itemsCenter>
          <button onClick={() => dispatch({ type: ActionTypes.clearDays })}>Clear</button>

          <button
            data-testid="Load mock data button"
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
        </Div>
      )}

      <Div columnTop fixed bottom={10} left={10}>
        {favourites.map(fav => (
          <div key={fav.id}>
            {fav.name} ({fav.type})
          </div>
        ))}
      </Div>
    </>
  )
}

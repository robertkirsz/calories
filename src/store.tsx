import { createContext, useReducer, Dispatch, ReactNode, useEffect } from 'react'

import { DayInterface, SettingsInterface, StoreStateInterface } from 'types'
import { daysReducer, settingsReducer, Actions } from 'reducers'
import defaultSettings from 'defaultSettings'

const stateFromStorage = {
  days: (JSON.parse(String(localStorage.getItem('days'))) as DayInterface[]) || [],
  settings:
    (JSON.parse(String(localStorage.getItem('settings'))) as SettingsInterface) || defaultSettings,
}

const StoreContext = createContext<{
  state: StoreStateInterface
  dispatch: Dispatch<Actions>
}>({
  state: stateFromStorage,
  dispatch: () => {},
})

const mainReducer = ({ days, settings }: StoreStateInterface, action: Actions) => {
  console.log(action.type)
  return {
    days: daysReducer(days, action),
    settings: settingsReducer(settings, action),
  }
}

type Props = {
  initialState?: StoreStateInterface
  children: ReactNode
}

function StoreProvider({ children, initialState = stateFromStorage }: Props) {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  useEffect(() => {
    localStorage.setItem('days', JSON.stringify(state.days))
  }, [state.days])

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(state.settings))
  }, [state.settings])

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export { StoreProvider, StoreContext }

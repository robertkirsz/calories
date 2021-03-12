import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

import { DayInterface, ActivityInterface, SettingsInterface, StoreStateInterface } from 'types'

export enum ActionTypes {
  // Days
  addNewDay = 'addNewDay',
  deleteDay = 'deleteDay',
  setDays = 'setDays',
  clearDays = 'clearDays',
  // Activities
  addActivity = 'addActivity',
  editActivity = 'editActivity',
  deleteActivity = 'deleteActivity',
  copyActivity = 'copyActivity',
  // Settings
  changeDailyCaloricTarget = 'changeDailyCaloricTarget',
  toggleDarkMode = 'toggleDarkMode',
}

// prettier-ignore
export type Actions =
  // Days
  | { type: ActionTypes.addNewDay; }
  | { type: ActionTypes.deleteDay; payload: DayInterface['id'] }
  | { type: ActionTypes.setDays; payload: DayInterface[] }
  | { type: ActionTypes.clearDays; }
  // Activities
  | { type: ActionTypes.addActivity; payload: { dayId: DayInterface['id']; formData: ActivityInterface } }
  | { type: ActionTypes.editActivity; payload: { dayId: DayInterface['id']; formData: ActivityInterface } }
  | { type: ActionTypes.deleteActivity; payload: { dayId: DayInterface['id']; activityId: ActivityInterface['id'] } }
  | { type: ActionTypes.copyActivity; payload: ActivityInterface }
  // Settings
  | { type: ActionTypes.changeDailyCaloricTarget; payload: number }
  | { type: ActionTypes.toggleDarkMode; }

const daysReducer = (state: DayInterface[], action: Actions) => {
  switch (action.type) {
    case 'addNewDay':
      return [...state, { id: uuid(), date: dayjs().format('YYYY-MM-DD'), activities: [] }]
    case 'deleteDay':
      return state.filter(day => day.id !== action.payload)
    case 'setDays':
      return action.payload
    case 'clearDays':
      return []
    case 'addActivity':
      return state.map(day =>
        day.id !== action.payload.dayId
          ? day
          : { ...day, activities: [...day.activities, action.payload.formData] }
      )
    case 'editActivity':
      return state.map(day =>
        day.id !== action.payload.dayId
          ? day
          : {
              ...day,
              activities: day.activities.map(activity =>
                activity.id !== action.payload.formData.id ? activity : action.payload.formData
              ),
            }
      )
    case 'deleteActivity':
      return state.map(day =>
        day.id !== action.payload.dayId
          ? day
          : {
              ...day,
              activities: day.activities.filter(
                activity => activity.id !== action.payload.activityId
              ),
            }
      )
    case 'copyActivity':
      const copiedActivity: ActivityInterface = { ...action.payload, id: uuid() }
      const todaysDay = state.find(day => dayjs().isSame(day.date, 'day'))

      if (!todaysDay) {
        const newDay: DayInterface = {
          id: uuid(),
          date: dayjs().format('YYYY-MM-DD'),
          activities: [copiedActivity],
        }

        return [...state, newDay]
      }

      return state.map(day =>
        day.id === todaysDay.id ? { ...day, activities: [...day.activities, copiedActivity] } : day
      )
    default:
      return state
  }
}

const settingsReducer = (state: SettingsInterface, action: Actions) => {
  switch (action.type) {
    case ActionTypes.changeDailyCaloricTarget:
      return { ...state, dailyCaloricTarget: action.payload }
    case ActionTypes.toggleDarkMode:
      return { ...state, darkMode: !state.darkMode }
    default:
      return state
  }
}

export const mainReducer = ({ days, settings }: StoreStateInterface, action: Actions) => ({
  days: daysReducer(days, action),
  settings: settingsReducer(settings, action),
})

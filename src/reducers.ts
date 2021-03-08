import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

import { DayInterface, ActivityInterface, SettingsInterface } from 'types'

export enum ActionTypes {
  // days
  addNewDay = 'addNewDay',
  deleteDay = 'deleteDay',
  addActivity = 'addActivity',
  editActivity = 'editActivity',
  deleteActivity = 'deleteActivity',
  setDays = 'setDays',
  clearDays = 'clearDays',
  // settings
  changeDailyCaloricTarget = 'changeDailyCaloricTarget',
  toggleDarkMode = 'toggleDarkMode',
}

// prettier-ignore
export type Actions =
  // days
  | { type: ActionTypes.addNewDay; }
  | { type: ActionTypes.deleteDay; payload: { dayId: DayInterface['id'] } }
  | { type: ActionTypes.addActivity; payload: { dayId: DayInterface['id']; formData: ActivityInterface } }
  | { type: ActionTypes.editActivity; payload: { dayId: DayInterface['id']; formData: ActivityInterface } }
  | { type: ActionTypes.deleteActivity; payload: { dayId: DayInterface['id']; activityId: ActivityInterface['id'] } }
  | { type: ActionTypes.setDays; payload: DayInterface[] }
  | { type: ActionTypes.clearDays; }
  // settings
  | { type: ActionTypes.changeDailyCaloricTarget; payload: number }
  | { type: ActionTypes.toggleDarkMode; }

export const daysReducer = (state: DayInterface[], action: Actions) => {
  switch (action.type) {
    case 'addNewDay':
      return [...state, { id: uuid(), date: dayjs().format('YYYY-MM-DD'), activities: [] }]
    case 'deleteDay':
      return state.filter(day => day.id !== action.payload.dayId)
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
    case 'setDays':
      return action.payload
    case 'clearDays':
      return []
    default:
      return state
  }
}

export const settingsReducer = (state: SettingsInterface, action: Actions) => {
  switch (action.type) {
    case ActionTypes.changeDailyCaloricTarget:
      return { ...state, dailyCaloricTarget: action.payload }
    case ActionTypes.toggleDarkMode:
      return { ...state, darkMode: !state.darkMode }
    default:
      return state
  }
}

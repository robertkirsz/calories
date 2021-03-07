import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

import { DayInterface } from 'types'

export const initialDays = JSON.parse(String(localStorage.getItem('days'))) as DayInterface[]

function reducer(state: DayInterface[], action: any) {
  console.log('🚀 ~ daysReducer', action)
  switch (action.type) {
    case 'addNewDay':
      return [...state, { id: uuid(), date: dayjs().format('YYYY-MM-DD'), activities: [] }]
    case 'deleteDay':
      return state.filter(day => day.id !== action.payload.dayId)
    case 'addActivity':
      return state.map(day =>
        day.id !== action.payload.dayId
          ? day
          : {
              ...day,
              activities: [...day.activities, action.payload.formData],
            }
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
      return action.payload.days
    case 'clearDays':
      return []
    default:
      throw new Error('Unrecognized action in daysReducer')
  }
}

export default reducer

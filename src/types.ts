export type ActivityType = 'gramsOfKcal' | 'onlyKcal'
export type ActivityValue = 'name' | 'consumedGrams' | 'kcalPer100g' | 'consumedKcal'

export interface ActivityInterface {
  id: string
  type: ActivityType
  name: string
  kcalPer100g: number
  consumedGrams: number
  consumedKcal: number
}

export interface DayInterface {
  id: string
  date: string
  activities: ActivityInterface[]
  isCollapsed?: boolean
}

export interface SettingsInterface {
  dailyCaloricTarget: number
  darkMode: boolean
}

export interface StoreStateInterface {
  days: DayInterface[]
  favourites: ActivityInterface[]
  settings: SettingsInterface
}

export type ActivityType = 'gramsOfKcal' | 'onlyKcal'

export interface ActivityInterface {
  id: string
  type: ActivityType
  name: string
  kcalPer100g: number | null
  consumedGrams: number | null
  consumedKcal: number | null
}

export interface DayInterface {
  id: string
  date: string
  activities: ActivityInterface[]
}

export interface ActivityFormDataInterface {
  type: ActivityType
  consumedGrams: number | null
  kcalPer100g: number | null
  consumedKcal: number | null
  name: string
}

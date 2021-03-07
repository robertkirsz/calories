export type ActivityType = 'gramsOfKcal' | 'onlyKcal'

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
}

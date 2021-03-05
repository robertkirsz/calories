export type ActivityType = 'gramsOfKcal' | 'onlyKcal'

export interface MealInterface {
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
  meals: MealInterface[]
}

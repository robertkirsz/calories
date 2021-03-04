export interface MealInterface {
  id: string
  kcalPer100g: number
  consumedGrams: number
  name: string
}

export interface DayInterface {
  id: string
  date: string
  meals: MealInterface[]
}

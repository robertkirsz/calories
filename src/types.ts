export interface MealInterface {
  id: string
  kcalPer100g: number
  consumedGrams: number
  name: string
}

export interface DayInterface {
  date: string
  meals: MealInterface[]
}

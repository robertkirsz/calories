import type { MealInterface } from 'types'

type Props = {
  meal: MealInterface
}

export default function Meal({ meal }: Props) {
  return (
    <div className="meal" data-testid="Meal">
      {meal.name || meal.id}
    </div>
  )
}

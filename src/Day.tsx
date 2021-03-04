import dayjs from 'dayjs'

import type { DayInterface } from 'types'

import Meal from 'Meal'

type Props = {
  day: DayInterface
}

export default function Day({ day }: Props) {
  return (
    <div className="day" data-testid="Day">
      <nav>
        <span>{dayjs(day.date).format('DD-MM-YYYY')}</span>
        <button>Delete</button>
      </nav>

      <div className="meals-list">
        {day.meals.map(meal => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  )
}

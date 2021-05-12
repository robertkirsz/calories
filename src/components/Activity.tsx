import type { ActivityInterface, DayInterface } from 'types'

import Div from 'components/Div'
import ActivityMenu from 'components/ActivityMenu'
import DailyCaloricProgress from 'components/DailyCaloricProgress'

type Props = {
  activity: ActivityInterface
  dayId: DayInterface['id']
}

export const getTotalCalories = ({
  type,
  kcalPer100g,
  consumedGrams,
  consumedKcal,
}: ActivityInterface) =>
  type === 'onlyKcal' ? consumedKcal : Math.round((kcalPer100g * consumedGrams) / 100)

export default function Activity({ activity, dayId }: Props) {
  const totalCalories = getTotalCalories(activity)

  return (
    <Div
      columnTop={2}
      relative
      padding="8px 0 8px 8px"
      background="rgba(255, 255, 255, 0.08)"
      data-testid="Activity"
    >
      <DailyCaloricProgress
        kcal={totalCalories}
        small
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      <Div justifyBetween itemsCenter>
        <Div column>
          {activity.name !== '' && <strong data-testid="Activity name">{activity.name}</strong>}

          <Div itemsBaseline listLeft={4}>
            <span data-testid="Activity calories">{totalCalories} kcal</span>

            {activity.type === 'gramsOfKcal' && (
              <Div fontSize="0.8em" data-testid="Activity details">
                ({activity.consumedGrams} g x {activity.kcalPer100g} kcal/100g)
              </Div>
            )}
          </Div>
        </Div>

        <ActivityMenu dayId={dayId} activity={activity} />
      </Div>
    </Div>
  )
}

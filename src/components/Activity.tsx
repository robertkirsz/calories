import type { ActivityInterface, DayInterface } from 'types'

import Div from 'components/Div'
import ActivityMenu from 'components/ActivityMenu'

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
  return (
    <Div justifyBetween itemsCenter border="1px solid" data-testid="Activity">
      <Div columnTop>
        {activity.name !== '' && <span data-testid="Activity name">{activity.name}</span>}

        <Div itemsBaseline>
          <span data-testid="Activity calories">{getTotalCalories(activity)} kcal</span>

          {activity.type === 'gramsOfKcal' && (
            <Div mLeft={8} fontSize="0.8em" data-testid="Activity details">
              ({activity.consumedGrams} g x {activity.kcalPer100g} kcal/100g)
            </Div>
          )}
        </Div>
      </Div>

      <ActivityMenu dayId={dayId} activity={activity} />
    </Div>
  )
}

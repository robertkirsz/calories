import styled from 'styled-components'

import type { ActivityInterface, DayInterface } from 'types'

import { useStore, ActionTypes } from 'store'

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
  const { dispatch } = useStore()

  const totalCalories = getTotalCalories(activity)

  function favouriteActivity() {
    dispatch({ type: ActionTypes.addFavourite, payload: { ...activity } })
  }

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

      <Div itemsCenter>
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

        <FavouriteButton
          data-testid="Activity favourite button"
          isActive={true}
          onClick={favouriteActivity}
        >
          ⭐️
        </FavouriteButton>

        <ActivityMenu dayId={dayId} activity={activity} />
      </Div>
    </Div>
  )
}

const FavouriteButton = styled.button<{ isActive: boolean }>`
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;

  ${props =>
    !props.isActive &&
    `
    filter: grayscale(1);
    opacity: 0.5;
  `}
`

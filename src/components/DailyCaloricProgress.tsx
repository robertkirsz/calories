import styled from 'styled-components'

import { useStore } from 'store'

type Props = {
  kcal: number
  small?: boolean
}

export default function DailyCaloricProgress({ kcal, small }: Props) {
  const {
    state: {
      settings: { dailyCaloricTarget },
    },
  } = useStore()

  const percentage = dailyCaloricTarget > 0 ? Math.round((kcal / dailyCaloricTarget) * 100) : 0

  if (percentage <= 0) return null

  return (
    <Wrapper
      data-testid="DailyCaloricProgress"
      style={{
        width: (percentage > 100 ? 100 : percentage) + '%',
        height: small ? 5 : 10,
        backgroundColor: percentage > 100 ? 'red' : 'lime',
      }}
    />
  )
}

const Wrapper = styled.div`
  transition-property: width, background-color;
  transition-duration: 200ms;
  will-change: width, background-color;
`

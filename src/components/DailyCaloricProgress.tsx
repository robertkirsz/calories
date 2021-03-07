import styled from 'styled-components'

type Props = {
  percentage: number | null
}

export default function DailyCaloricProgress({ percentage }: Props) {
  if (percentage === null || percentage <= 0) return null

  return (
    <Wrapper
      data-testid="DailyCaloricProgress"
      style={{
        width: (percentage > 100 ? 100 : percentage) + '%',
        backgroundColor: percentage > 100 ? 'red' : 'lime',
      }}
    />
  )
}

const Wrapper = styled.div`
  height: 10px;
  transition-property: width, background-color;
  transition-duration: 200ms;
  will-change: width, background-color;
`

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
  const width = (Math.abs(percentage) > 100 ? 100 : Math.abs(percentage)) + '%'
  const height = small ? 5 : 10
  const backgroundColor =
    percentage > 100 ? 'var(--red)' : percentage < 0 ? 'var(--blue)' : 'var(--green)'

  return <div data-testid="DailyCaloricProgress" style={{ width, height, backgroundColor }} />
}

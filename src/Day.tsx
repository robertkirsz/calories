import type { DayInterface } from 'types'

type Props = {
  day: DayInterface
}

export default function Day({ day }: Props) {
  return <div>{day.date}</div>
}

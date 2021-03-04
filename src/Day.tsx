import dayjs from 'dayjs'
import type { DayInterface } from 'types'

type Props = {
  day: DayInterface
}

export default function Day({ day }: Props) {
  return <div data-testid="Day">{dayjs(day.date).format('DD-MM-YYYY')}</div>
}

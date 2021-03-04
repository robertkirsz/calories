import { useState } from 'react'
import dayjs from 'dayjs'

import type { DayInterface } from 'types'
import { descendingBy } from 'utils'

import Modal from 'components/Modal'
import Day from 'components/Day'

type Props = {
  initialState: DayInterface[]
  autosaveEnabled?: boolean
}

export default function App({ initialState }: Props) {
  const [days] = useState([...initialState])
  const [showAddNewDayModal, setShowAddNewDayModal] = useState(false)

  const sortedDays = days.sort(descendingBy('date'))

  function saveData() {
    localStorage.setItem('days', JSON.stringify(days))
  }

  function clearData() {
    localStorage.removeItem('days')
  }

  return (
    <>
      <button
        disabled={dayjs().isSame(sortedDays[0].date, 'day')}
        onClick={() => setShowAddNewDayModal(true)}
      >
        New day
      </button>

      {sortedDays.map(day => (
        <Day key={day.id} day={day} />
      ))}

      <button onClick={saveData}>Save</button>
      <button onClick={clearData}>Clear</button>

      <Modal
        show={showAddNewDayModal}
        onClose={() => setShowAddNewDayModal(false)}
      >
        Add day!
      </Modal>
    </>
  )
}

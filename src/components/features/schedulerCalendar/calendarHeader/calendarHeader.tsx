import type { Dayjs } from 'dayjs'
import SchedulerCalendarHeaderLeftSide from './leftSide'

type Props = {
  selectedDate: Dayjs
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>
}

const CalendarHeader = (props:Props) => {
  const {selectedDate, setSelectedDate} = props

  return (
    <div className='flex align-middle justify-between w-full px-3 py-1.5'>
      <SchedulerCalendarHeaderLeftSide selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
    </div>
  )
}

export default CalendarHeader
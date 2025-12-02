import type { Dayjs } from 'dayjs'
import SchedulerCalendarHeaderLeftSide from './leftSide'

type Props = {
  calendarLoading: boolean
  selectedDate: Dayjs
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>
}

const CalendarHeader = (props:Props) => {
  const {calendarLoading, selectedDate, setSelectedDate} = props

  return (
    <div className='flex align-middle justify-between w-full px-3 py-1.5'>
      <SchedulerCalendarHeaderLeftSide calendarLoading={calendarLoading} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
    </div>
  )
}

export default CalendarHeader
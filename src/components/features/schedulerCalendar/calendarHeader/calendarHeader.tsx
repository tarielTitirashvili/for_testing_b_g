import type { Dayjs } from 'dayjs'
import SchedulerCalendarHeaderLeftSide from './leftSide'

type Props = {
  calendarLoading: boolean
  selectedDate: Dayjs
  handleSetSelectedDate: (date: Dayjs) => void
}

const CalendarHeader = (props: Props) => {
  const { calendarLoading, selectedDate, handleSetSelectedDate } = props

  return (
    <div className="flex align-middle justify-between w-full px-3 py-1.5">
      <SchedulerCalendarHeaderLeftSide
        calendarLoading={calendarLoading}
        selectedDate={selectedDate}
        handleSetSelectedDate={handleSetSelectedDate}
      />
    </div>
  )
}

export default CalendarHeader

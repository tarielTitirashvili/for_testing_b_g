import type { Dayjs } from 'dayjs'
import CalendarHeader from './calendarHeader/calendarHeader'
import CalendarView from './calendarViews'
import dayjs from 'dayjs'
import { useState } from 'react'

const SchedulerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()) // redux cant work with state in date format so we should use local state

  return (
    <div>
      <CalendarHeader selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <CalendarView selectedDate={selectedDate} />
    </div>
  )
}

export default SchedulerCalendar

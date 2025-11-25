import type { Dayjs } from 'dayjs'
import CalendarHeader from './calendarHeader/calendarHeader'
import CalendarView from './calendarViews'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useGetCalendarBookingsQuery } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'

const SchedulerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()) // redux cant work with state in date format so we should use local state

  const { data } = useGetCalendarBookingsQuery({
    start: dayjs().subtract(12, "week").tz(dayjs.tz.guess()).format("YYYY-MM-DDTHH:mm:ssZ").toString(),
    end: dayjs().tz(dayjs.tz.guess()).format("YYYY-MM-DDTHH:mm:ssZ").toString(),
    includeExternal: true,
    includeInternal: true,
    staffIds: [],
    tableCategoryIds: [],
    statusIds: [],
  })
  console.log(data)
  // const local = dayjs("2025-11-16T21:43:00+04:00").tz(dayjs.tz.guess()).format();

  // console.log(local)
  return (
    <div>
      <CalendarHeader selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <CalendarView selectedDate={selectedDate} />
    </div>
  )
}

export default SchedulerCalendar

import type { Dayjs } from 'dayjs'
import CalendarHeader from './calendarHeader/calendarHeader'
import CalendarView from './calendarViews'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useGetCalendarBookingsQuery } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import Loader from '@/components/shared/loader'

const SchedulerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()) // redux cant work with state in date format so we should use local state

  const { data: calendarEvents, isFetching: isEventsFetching, isLoading: isEventsLoading } = useGetCalendarBookingsQuery({
    start: dayjs().subtract(12, "week").tz(dayjs.tz.guess()).format("YYYY-MM-DDTHH:mm:ssZ").toString(),
    end: dayjs().add(3, 'day').tz(dayjs.tz.guess()).format("YYYY-MM-DDTHH:mm:ssZ").toString(),
    includeExternal: true,
    includeInternal: true,
    staffIds: [],
    tableCategoryIds: [],
    statusIds: [],
  })
  // const local = dayjs("2025-11-16T21:43:00+04:00").tz(dayjs.tz.guess()).format();

  if(!calendarEvents){
    return <Loader containerClassname='h-150' />
  }

  // console.log(local)
  return (
    <Loader loading={isEventsFetching || isEventsLoading}>
      <CalendarHeader selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <CalendarView calendarEvents={calendarEvents} selectedDate={selectedDate} />
    </Loader>
  )
}

export default SchedulerCalendar

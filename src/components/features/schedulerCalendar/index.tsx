import type { Dayjs } from 'dayjs'
import CalendarHeader from './calendarHeader/calendarHeader'
import CalendarView from './calendarViews'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useGetCalendarBookingsQuery, type IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import Loader from '@/components/shared/loader'

const SchedulerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()) // redux cant work with state in date format so we should use local state
  const [page, setPage] = useState<number>(1)
  const [calendarEvents, setCalendarEvents] = useState<IRootCalendarResponse | null | undefined>(null)
  const infiniteScrollPageChangeRef = useRef(false)

  const { data: calendarEventsFromApi, isFetching: isEventsFetching, isLoading: isEventsLoading } = useGetCalendarBookingsQuery({
    start: selectedDate.tz(dayjs.tz.guess()).startOf("day").format("YYYY-MM-DDTHH:mm:ssZ").toString(),
    end: selectedDate.add(1, "day").tz(dayjs.tz.guess()).startOf("day").format("YYYY-MM-DDTHH:mm:ssZ").toString(),
    includeExternal: true,
    includeInternal: true,
    staffIds: [],
    tableCategoryIds: [],
    statusIds: [],
    page: page,
    offset: 8,
  })
  // const local = dayjs("2025-11-16T21:43:00+04:00").tz(dayjs.tz.guess()).format();
  
  useEffect(()=>{
    if(infiniteScrollPageChangeRef.current){
      setCalendarEvents(prev => {
        if (!prev || !calendarEventsFromApi) return calendarEventsFromApi;

        return {
          ...prev,
          staff: prev.staff && calendarEventsFromApi.staff
            ? { ...prev.staff, data: [...prev.staff.data, ...calendarEventsFromApi.staff.data] }
            : null,
          tables: prev.tables && calendarEventsFromApi.tables
            ? { ...prev.tables, data: [...prev.tables.data, ...calendarEventsFromApi.tables.data] }
            : null,
        };
      });
    }else{
      setCalendarEvents(calendarEventsFromApi)
    }
  },[calendarEventsFromApi])
  console.log(calendarEvents)
  if(!calendarEvents){
    return <Loader containerClassname='h-150' />
  }

  // console.log(local)
  const calendarLoading = isEventsFetching || isEventsLoading
  return (
    <Loader loading={calendarLoading}>
      <CalendarHeader selectedDate={selectedDate} calendarLoading={calendarLoading} setSelectedDate={setSelectedDate}/>
      <CalendarView
        calendarEvents={calendarEvents}
        selectedDate={selectedDate}
        page={page}
        setPage={setPage}
        calendarLoading={calendarLoading}
        infiniteScrollPageChangeRef={infiniteScrollPageChangeRef}
      />
    </Loader>
  )
}

export default SchedulerCalendar

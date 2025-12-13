import type { Dayjs } from 'dayjs'
import CalendarHeader from './calendarHeader/calendarHeader'
import CalendarView from './calendarViews'
import Loader from '@/components/shared/loader'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'

type TProps = {
  calendarEvents: IRootCalendarResponse | null | undefined
  calendarLoading: boolean
  selectedDate: Dayjs
  handleSetSelectedDate: (date: Dayjs) => void
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  infiniteScrollPageChangeRef: React.RefObject<boolean>
}

const SchedulerCalendar = (props: TProps) => {
  const {
    calendarEvents,
    calendarLoading,
    selectedDate,
    handleSetSelectedDate,
    page,
    setPage,
    infiniteScrollPageChangeRef,
  } = props

  console.log(calendarEvents)

  if (!calendarEvents) {
    return <Loader containerClassname="h-150" />
  }
  // console.log(local)
  return (
    <Loader loading={calendarLoading}>
      <CalendarHeader
        selectedDate={selectedDate}
        calendarLoading={calendarLoading}
        handleSetSelectedDate={handleSetSelectedDate}
      />
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

import type { Dayjs } from 'dayjs'
import type dayjs from 'dayjs'
import DayView from './dayView'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'

type Props = {
  selectedDate: Dayjs
  calendarEvents: IRootCalendarResponse
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  calendarLoading: boolean
  infiniteScrollPageChangeRef: React.RefObject<boolean>
}

export type OnDayClick = (day: dayjs.Dayjs, hour?: dayjs.Dayjs) => void

const CalendarView = (props: Props) => {
  const {
    selectedDate,
    calendarEvents,
    page,
    setPage,
    calendarLoading,
    infiniteScrollPageChangeRef,
  } = props

  const handleClick: OnDayClick = (day, hour) => {
    console.log('day', day)
    console.log('hour', hour)
  }

  return (
    <div>
      <DayView
        selectedDate={selectedDate}
        handleClick={handleClick}
        calendarEvents={calendarEvents}
        setPage={setPage}
        page={page}
        calendarLoading={calendarLoading}
        infiniteScrollPageChangeRef={infiniteScrollPageChangeRef}
      />
    </div>
  )
}

export default CalendarView

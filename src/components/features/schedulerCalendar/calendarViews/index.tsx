import type { Dayjs } from 'dayjs'
import DayView from './dayView'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import type { OnDayClick, THandleClickBooking } from '@/pages/business/calendar'

type Props = {
  selectedDate: Dayjs
  calendarEvents: IRootCalendarResponse
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  calendarLoading: boolean
  infiniteScrollPageChangeRef: React.RefObject<boolean>
  handleClickBooking: (params:THandleClickBooking)=>void
  handleClickTimeSlot: OnDayClick
} 


const CalendarView = (props: Props) => {
  const {
    selectedDate,
    calendarEvents,
    page,
    setPage,
    calendarLoading,
    infiniteScrollPageChangeRef,
    handleClickBooking,
    handleClickTimeSlot
  } = props

  return (
    <div>
      <DayView
        selectedDate={selectedDate}
        handleClickTimeSlot={handleClickTimeSlot}
        calendarEvents={calendarEvents}
        setPage={setPage}
        page={page}
        calendarLoading={calendarLoading}
        infiniteScrollPageChangeRef={infiniteScrollPageChangeRef}
        handleClickBooking={handleClickBooking}
      />
    </div>
  )
}

export default CalendarView

import type { Dayjs } from 'dayjs'
import type dayjs from 'dayjs'
import DayView from './dayView'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import type { TClickedBooking } from '@/pages/business/calendar'

type Props = {
  selectedDate: Dayjs
  calendarEvents: IRootCalendarResponse
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  calendarLoading: boolean
  infiniteScrollPageChangeRef: React.RefObject<boolean>
  addBookingDateFromCalendar: React.RefObject<dayjs.Dayjs | null>
  handleChangeIsOpen: (isOpenStatus: boolean) => void
  clickedBookingRef: React.RefObject<TClickedBooking | null>
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
    addBookingDateFromCalendar,
    handleChangeIsOpen,
    clickedBookingRef
  } = props

  const handleClick: OnDayClick = (day) => {
    addBookingDateFromCalendar.current = day
    handleChangeIsOpen(true)
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
        clickedBookingRef={clickedBookingRef}
        handleChangeIsOpen={handleChangeIsOpen}
      />
    </div>
  )
}

export default CalendarView

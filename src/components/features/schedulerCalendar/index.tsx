import type { Dayjs } from 'dayjs'
import CalendarHeader from './calendarHeader/calendarHeader'
import CalendarView from './calendarViews'
import Loader from '@/components/shared/loader'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import type dayjs from 'dayjs'
import type { TClickedBooking } from '@/pages/business/calendar'

type TProps = {
  calendarEvents: IRootCalendarResponse | null | undefined
  calendarLoading: boolean
  selectedDate: Dayjs
  handleSetSelectedDate: (date: Dayjs) => void
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  infiniteScrollPageChangeRef: React.RefObject<boolean>
  handleChangeIsOpen: (isOpenStatus: boolean) => void
  addBookingDateFromCalendar: React.RefObject<dayjs.Dayjs | null>
  clickedBookingRef: React.RefObject<TClickedBooking | null>
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
    addBookingDateFromCalendar,
    handleChangeIsOpen,
    clickedBookingRef
  } = props

  // console.log(calendarEvents)

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
        handleChangeIsOpen={handleChangeIsOpen}
        addBookingDateFromCalendar={addBookingDateFromCalendar}
        clickedBookingRef={clickedBookingRef}
      />
    </Loader>
  )
}

export default SchedulerCalendar

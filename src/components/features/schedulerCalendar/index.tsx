import type { Dayjs } from 'dayjs'
import CalendarHeader from './calendarHeader/calendarHeader'
import CalendarView from './calendarViews'
import Loader from '@/components/shared/loader'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import type { OnDayClick, TClickedFilteredBookingsRef, THandleClickBooking } from '@/pages/business/calendar'
import MoreBookingsModal from './moreBookingsModal'

type TProps = {
  calendarEvents: IRootCalendarResponse | null | undefined
  handleClickTimeSlot: OnDayClick
  calendarLoading: boolean
  selectedDate: Dayjs
  handleSetSelectedDate: (date: Dayjs) => void
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  infiniteScrollPageChangeRef: React.RefObject<boolean>
  clickedFilteredBookingsRef: React.RefObject<TClickedFilteredBookingsRef | null>
  handleClickBooking: (params: THandleClickBooking) => void
  isMoreBookingsModalOpen: boolean
  handleChangeIsMoreBookingsModalOpen: (isOpenStatus: boolean) => void
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
    handleClickBooking,
    handleClickTimeSlot,
    isMoreBookingsModalOpen,
    clickedFilteredBookingsRef,
    handleChangeIsMoreBookingsModalOpen,
  } = props

  // console.log(calendarEvents)

  if (!calendarEvents) {
    return <Loader containerClassname="h-150" />
  }
  // console.log(local)
  return (
    <Loader loading={calendarLoading}>
      {isMoreBookingsModalOpen && (
        <MoreBookingsModal
          isOpen={isMoreBookingsModalOpen}
          clickedFilteredBookingsRef={clickedFilteredBookingsRef}
          setIsOpen={handleChangeIsMoreBookingsModalOpen}
        />
      )}
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
        handleClickBooking={handleClickBooking}
        handleClickTimeSlot={handleClickTimeSlot}
      />
    </Loader>
  )
}

export default SchedulerCalendar

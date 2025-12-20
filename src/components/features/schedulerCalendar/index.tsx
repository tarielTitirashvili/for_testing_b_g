import type { Dayjs } from 'dayjs'
import CalendarHeader from './calendarHeader/calendarHeader'
import CalendarView from './calendarViews'
import Loader from '@/components/shared/loader'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import type {
  OnDayClick,
  TClickedBooking,
  TClickedFilteredBookingsRef,
  THandleClickBooking,
} from '@/pages/business/calendar'
import MoreBookingsModal from './moreBookingsModal'
import BookingDetails from '@/pages/business/bookings/bookingsActions/BookingDetails'
import { transformToLocalDate } from './constants'
import dayjs from 'dayjs'
import { BOOKING_STATUS_LABELS_BY_ID } from '@/pages/business/bookings/constants'
import type { BadgeVariant } from '@/components/shared/buttons/BookingStatusBadges'
import { selectedBusinessProfileSelector } from '@/redux/auth/authSelectors'
import { useSelector } from 'react-redux'

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
  isDetailsModalOpen: boolean
  handleClickBookingDetails: (isOpenStatus: boolean) => void
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
    handleClickBooking,
    handleClickTimeSlot,
    isMoreBookingsModalOpen,
    clickedFilteredBookingsRef,
    handleChangeIsMoreBookingsModalOpen,
    isDetailsModalOpen,
    handleClickBookingDetails,
    clickedBookingRef,
  } = props

  // console.log(calendarEvents)
  const selectedBusinessProfile = useSelector(selectedBusinessProfileSelector)

  if (!calendarEvents) {
    return <Loader containerClassname="h-150" />
  }
  // console.log(local)
  const clickedBookingEvent = clickedBookingRef?.current?.event
  const status: { label: string; variant: BadgeVariant } =
    BOOKING_STATUS_LABELS_BY_ID[
      clickedBookingEvent?.status.id as keyof typeof BOOKING_STATUS_LABELS_BY_ID
    ]

    return (
    <Loader loading={calendarLoading}>
      {isMoreBookingsModalOpen && (
        <MoreBookingsModal
          isOpen={isMoreBookingsModalOpen}
          clickedFilteredBookingsRef={clickedFilteredBookingsRef}
          setIsOpen={handleChangeIsMoreBookingsModalOpen}
          handleClickBooking={handleClickBooking}
        />
      )}
      <BookingDetails
        open={isDetailsModalOpen}
        setOpen={handleClickBookingDetails}
        changeNoShowStatusMutation={() => {}}
        bookingId={clickedBookingRef?.current?.event.id || 1}
        booking={{
          UId: clickedBookingEvent?.id || 1,
          id: clickedBookingEvent?.id || 1,
          dateTime: transformToLocalDate(
            clickedBookingEvent?.startDate || dayjs()
          ).format('YYYY-MM-DDTHH:mm:ss'),
          customer: `${clickedBookingEvent?.client.firstName} ${clickedBookingEvent?.client.lastName}`,
          phone: null,
          service: clickedBookingEvent?.services
            ? clickedBookingEvent?.services[0]?.name
            : undefined,
          teamMember: `${clickedBookingRef?.current?.staff?.firstName} ${clickedBookingRef?.current?.staff?.lastName}`,
          duration: 'tariel',
          price: clickedBookingEvent?.price?.toString() || '',
          guestsAmount: clickedBookingEvent?.guestCount || 0,
          table: clickedBookingRef?.current?.table?.name,
          status: clickedBookingEvent?.status.id || 1,
        }}
        variant={status?.variant || 1}
        businessType={selectedBusinessProfile?.businessCategory.id || null}
      />
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

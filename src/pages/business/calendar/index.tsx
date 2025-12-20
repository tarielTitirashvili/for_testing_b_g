import SchedulerCalendar from '@/components/features/schedulerCalendar'
import {
  useGetCalendarBookingsQuery,
  type IOrder,
  type IRootCalendarResponse,
  type ITableInfo,
} from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import CalendarFilters from './calendarFilters'
import { useGetStaffQuery } from '@/redux/business/staff/staffAPISlice'
import type { IStaffCard } from '../teams/Team'
import { useSelector } from 'react-redux'
import { selectedBusinessProfileSelector } from '@/redux/auth/authSelectors'
import { useGetTableCategoryQuery } from '@/redux/business/category/categoryAPISlice'
import type { IStaff } from '@/redux/business/booking/bookingAPISlice'
import { STATUS_BOOKING_EVENTS } from '@/components/features/schedulerCalendar/constants'
import AddBookingModal from '@/components/features/addBookingModal'

export interface ITableCategory {
  isSystem: boolean
  id: number
  name: string
}
export type TClickedBooking = {
  event: IOrder
  staff: IStaff | null
  table: ITableInfo | null
}
export type TClickedFilteredBookingsRef = {
  events: IOrder[]
  staff: IStaff | null | undefined
  table: ITableInfo | null | undefined
}
export type THandleClickBooking = {
  event: IOrder
  staff: IStaff | null
  table: ITableInfo | null
  shouldStopClickHere: boolean
  e?: React.MouseEvent<HTMLDivElement>
}
export type OnDayClick = (day: dayjs.Dayjs, filteredEvents: IOrder[], staff: IStaff | null, table?: ITableInfo | null, hour?: dayjs.Dayjs) => void

const staffDataTransformer = (data: IStaffCard[]) =>
  data.map((staff) => ({
    id: staff.id,
    value: staff.id,
    label: `${staff.firstName} ${staff.lastName}`,
    url: staff.file?.url || '',
  }))
const tableCategoryIdsTransformer = (data: ITableCategory[]) => {
  return data.map((tableCategory) => ({
    id: tableCategory.id,
    value: tableCategory.id,
    label: tableCategory.name,
  }))
}

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()) // redux cant work with state in date format so we should use local state
  const [page, setPage] = useState<number>(1)
  const [calendarEvents, setCalendarEvents] = useState<
    IRootCalendarResponse | null | undefined
  >(null)
  const infiniteScrollPageChangeRef = useRef(false)
  const addBookingDateFromCalendar = useRef<dayjs.Dayjs | null>(null)
  const clickedBookingRef = useRef<TClickedBooking | null>(null)
  const clickedFilteredBookingsRef = useRef<TClickedFilteredBookingsRef | null>(null)
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null)
  const [selectedTableCategoryId, setSelectedTableCategoryId] = useState<
    number | null
  >(null)

  const [isAddBookingModalOpen, setIsAddBookingModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)
  const [isMoreBookingsModalOpen, setIsMoreBookingsModalOpen] = useState(false)

  const selectedBusinessProfile = useSelector(selectedBusinessProfileSelector)
  const isBarber = selectedBusinessProfile?.businessCategory.id === 2 // 2 === barber && 1 === restaurant

  const {
    data: staffData,
    // isLoading: isStaffLoading,
    // isFetching: isStaffFetching,
  } = useGetStaffQuery(undefined, {
    skip: !isBarber,
    selectFromResult: (res) => {
      return {
        ...res,
        data: res.data ? staffDataTransformer(res.data) : undefined,
      }
    },
  })

  const { data: tableCategoryIds } = useGetTableCategoryQuery(undefined, {
    skip: isBarber,
    selectFromResult: (res) => {
      const data = res.data as ITableCategory[]

      return {
        ...res,
        data: res.data ? tableCategoryIdsTransformer(data) : undefined,
      }
    },
  })

  const {
    data: calendarEventsFromApi,
    isFetching: isEventsFetching,
    isLoading: isEventsLoading,
  } = useGetCalendarBookingsQuery({
    start: selectedDate
      .tz(dayjs.tz.guess())
      .startOf('day')
      .format('YYYY-MM-DDTHH:mm:ssZ')
      .toString(),
    end: selectedDate
      .add(1, 'day')
      .tz(dayjs.tz.guess())
      .startOf('day')
      .format('YYYY-MM-DDTHH:mm:ssZ')
      .toString(),
    includeExternal: true,
    includeInternal: true,
    TableIds: null,
    staffIds: selectedStaffId ? selectedStaffId : null,
    tableCategoryIds: selectedTableCategoryId,
    statusIds: [],
    page: page,
    offset: 8,
  })

  useEffect(() => {
    if (infiniteScrollPageChangeRef.current) {
      infiniteScrollPageChangeRef.current = false
      setCalendarEvents((prev) => {
        if (!prev || !calendarEventsFromApi) return calendarEventsFromApi

        return {
          ...prev,
          staff:
            prev.staff && calendarEventsFromApi.staff
              ? {
                  ...prev.staff,
                  data: [
                    ...prev.staff.data,
                    ...calendarEventsFromApi.staff.data,
                  ],
                }
              : null,
          tables:
            prev.tables && calendarEventsFromApi.tables
              ? {
                  ...prev.tables,
                  data: [
                    ...prev.tables.data,
                    ...calendarEventsFromApi.tables.data,
                  ],
                }
              : null,
        }
      })
    } else {
      setCalendarEvents(calendarEventsFromApi)
    }
  }, [calendarEventsFromApi])

  const handleSetSelectedDate = (date: Dayjs) => {
    if (page !== 1) {
      setPage(1)
    }
    setSelectedDate(date)
  }

  const handleSetSelectedStaffId = (id: string) => {
    if (page !== 1) {
      setPage(1)
    }
    setSelectedStaffId(id)
  }
  const handleSetSelectedTableCategoryId = (id: number) => {
    if (page !== 1) {
      setPage(1)
    }
    setSelectedTableCategoryId(id)
  }

  const handleClickToday = () => {
    handleSetSelectedDate(dayjs())
  }
  const handleChangeIsOpen = (isOpenStatus: boolean) => {
    if (isOpenStatus === false) {
      clickedBookingRef.current = null
    }
    setIsAddBookingModalOpen(isOpenStatus)
  }

  const handleChangeIsMoreBookingsModalOpen = (isOpenStatus: boolean) =>{
    if(isOpenStatus === false){
      clickedFilteredBookingsRef.current = null
    }
    setIsMoreBookingsModalOpen(isOpenStatus)
  }
  
  const handleClickBookingDetails = (isOpenStatus: boolean) =>{
    if(isOpenStatus === false){
      clickedBookingRef.current = null
    }
    setIsDetailsModalOpen(isOpenStatus)
  }

  const handleClickBooking = (params: THandleClickBooking) => {
    if (params.shouldStopClickHere) {
      params?.e?.stopPropagation()
    }else{
      return
    }
    if (params?.event.status.id === STATUS_BOOKING_EVENTS.pending.id) {
      handleChangeIsOpen(true)
    }else{
      handleClickBookingDetails(true)
    }
    clickedBookingRef.current = {
      event: params.event,
      staff: params.staff,
      table: params.table
    }
  }

  const handleClickTimeSlot: OnDayClick = (day, filteredEvents, staff, table) => {
    if(filteredEvents.length < 2){
      addBookingDateFromCalendar.current = day
      handleChangeIsOpen(true)
    }else{
      handleChangeIsMoreBookingsModalOpen(true)
      clickedFilteredBookingsRef.current = {
        events: filteredEvents,
        staff: staff,
        table: table
      }
    }
  }

  const calendarLoading = isEventsFetching || isEventsLoading

  return (
    <div>
      {/* modal */}
      {isAddBookingModalOpen && (
        <AddBookingModal
          businessType={selectedBusinessProfile?.businessCategory.id}
          isOpen={isAddBookingModalOpen}
          setIsOpen={handleChangeIsOpen}
          addBookingDateFromCalendar={addBookingDateFromCalendar}
          clickedBooking={clickedBookingRef.current}
          isMoreBookingsModalOpen={isMoreBookingsModalOpen}
          handleChangeIsMoreBookingsModalOpen={handleChangeIsMoreBookingsModalOpen}
        />
      )}
      {/* modal */}
      <CalendarFilters
        isBarber={isBarber}
        staffData={staffData}
        selectedStaffId={selectedStaffId}
        handleSetSelectedStaffId={handleSetSelectedStaffId}
        tableCategoryIds={tableCategoryIds}
        selectedTableCategoryId={selectedTableCategoryId}
        handleSetSelectedTableCategoryId={handleSetSelectedTableCategoryId}
        handleClickToday={handleClickToday}
        handleChangeIsOpen={handleChangeIsOpen}
      />
      <div className="bg-white rounded-md p-5">
        <SchedulerCalendar
          calendarLoading={calendarLoading}
          calendarEvents={calendarEvents}
          selectedDate={selectedDate}
          handleClickBooking={handleClickBooking}
          handleClickTimeSlot={handleClickTimeSlot}
          handleSetSelectedDate={handleSetSelectedDate}
          page={page}
          setPage={setPage}
          infiniteScrollPageChangeRef={infiniteScrollPageChangeRef}
          clickedFilteredBookingsRef={clickedFilteredBookingsRef}
          isMoreBookingsModalOpen={isMoreBookingsModalOpen}
          handleChangeIsMoreBookingsModalOpen={handleChangeIsMoreBookingsModalOpen}
          isDetailsModalOpen={isDetailsModalOpen}
          handleClickBookingDetails={handleClickBookingDetails}
          clickedBookingRef={clickedBookingRef}
        />
      </div>
    </div>
  )
}

export default Calendar

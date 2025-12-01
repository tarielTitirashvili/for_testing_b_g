import type { RootState } from '@/redux/store'

import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { CALENDAR_VIEW_OPTIONS, transformToLocalDate } from '../../../constants'
import { useRef } from 'react'
import type { IOrder, ITableInfo } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import type { IStaff } from '@/redux/business/booking/bookingAPISlice'
import EventByStatus from './eventByStatus'

type EventRendererProps = {
  date: dayjs.Dayjs
  events: IOrder[]
  staff: IStaff | null
  table?: ITableInfo | null
}
export function EventRenderer({ date, events, staff, table }: EventRendererProps) {
  const hasEventOnTwoDaysRef = useRef<boolean>(false)
  //! for monthView only

  const selectedView = useSelector(
    (state: RootState) => state.schedulerCalendar.selectedView
  )

  const filteredEvents = events.filter((event: IOrder) => {
    const endDate = transformToLocalDate(event.endDate)
      .format('DD-MM-YY HH:mm')
      .split(' ')
    const startDate = transformToLocalDate(event.startDate)
    const formattedDate = date.format('DD-MM-YY')
    // if (selectedView === CALENDAR_VIEW_OPTIONS[2].value) {
    //   // monthView
    //   return (
    //     event.date.format('DD-MM-YY') === formattedDate ||
    //     (endDate[0] === formattedDate && endDate[1] !== '00:00')
    //   )
    // } else if (
    // selectedView === CALENDAR_VIEW_OPTIONS[0].value ||
    // selectedView === CALENDAR_VIEW_OPTIONS[1].value
    // ) {
    // week and day views
    if (
      endDate[0] === formattedDate &&
      date.format('HH') === '00' &&
      startDate.format('DD-MM-YY') !== formattedDate &&
      endDate[1] !== '00:00'
    ) {
      hasEventOnTwoDaysRef.current = true
      return true
    } else {
      const start = date
      const end = date.add(15, 'minute')

      return startDate.isAfter(start) && startDate.isBefore(end)
      // return event.date.format('DD-MM-YY HH') === date.format('DD-MM-YY HH')
    }
    // }
  })

  const calculateEventLengthInMinutes = (event: IOrder) => {
    const startDate = transformToLocalDate(event.startDate)
    const endDate = transformToLocalDate(event.endDate)
    const startOfDay = date.startOf('day')
    //!if event starts yesterday
    if (startDate.isBefore(startOfDay, 'day')) {
      return endDate.diff(startOfDay, 'minute')
      //! if event finishes tomorrow
    } else if (endDate.isAfter(startOfDay, 'day')) {
      return startOfDay.add(1, 'day').diff(startDate, 'minute')
      //! all other cases
    } else return endDate.diff(startDate, 'minute')
  }
  const calculateStartPoint = (event: IOrder) => {
    if (hasEventOnTwoDaysRef.current) {
      return 0
    } else {
      return (
        ((transformToLocalDate(event.startDate).minute() - date.minute()) /
          15) *
        100
      )
    }
  }

  const getPositionOffEvent = (event: IOrder) => {
    if (selectedView !== CALENDAR_VIEW_OPTIONS[2].value) {
      return {
        left: `${calculateStartPoint(event)}%`,
        top: '5%',
        zIndex: 10,
        position: 'absolute' as React.CSSProperties['position'],
        height: '100%',
        width: `${(calculateEventLengthInMinutes(event) / 15) * 100 - 2}%`,
      }
    } else return {}
  }

  //! no bookings
  if (filteredEvents.length < 1) return <></>

  return (
    <>
      {filteredEvents?.map(event => {
        return (
          <EventByStatus
            key={event.id}
            event={event}
            staff={staff}
            table={table}
            getPositionOffEvent={getPositionOffEvent}
          />
        )
      })}
    </>
  )
}

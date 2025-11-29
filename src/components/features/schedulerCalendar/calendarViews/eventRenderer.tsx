import type { RootState } from '@/redux/store'
// import { CalendarEventType, useEventStore } from "@/lib/store";

import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { CALENDAR_VIEW_OPTIONS, transformToLocalDate } from '../constants'
import { useRef } from 'react'
import type { IOrder } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'

type EventRendererProps = {
  date: dayjs.Dayjs
  events: IOrder[]
}
export function EventRenderer({ date, events }: EventRendererProps) {
  const hasEventOnTwoDaysRef = useRef<boolean>(false)
  //! for monthView only

  const selectedView = useSelector(
    (state: RootState) => state.schedulerCalendar.selectedView
  )

  const filteredEvents = events.filter((event: IOrder) => {
    
    const endDate = transformToLocalDate(event.endDate).format('DD-MM-YY HH:mm').split(' ')
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
        const start = date;
        const end = date.add(15, 'minute');

        return startDate.isAfter(start) && startDate.isBefore(end);
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
      return ((transformToLocalDate(event.startDate).minute() - date.minute()) / 15) * 100
    }
  }

  const getPositionOffEvent = (event: IOrder) => {
    if (selectedView !== CALENDAR_VIEW_OPTIONS[2].value) {
      return {
        left: `${calculateStartPoint(event)}%`,
        top: '10%',
        zIndex: 10,
        position: 'absolute' as React.CSSProperties['position'],
        height: '90%',
        width: `${(calculateEventLengthInMinutes(event) / 15) * 100 - 2}%`,
      }
    } else return {}
  }

  //! no bookings
  if (filteredEvents.length < 1) return <></>

  const isMonthView = selectedView === CALENDAR_VIEW_OPTIONS[2].value
  const hasMore = isMonthView && filteredEvents.length > 3

  const handleClickMore = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation()
    // setShowAllEventsForMonthView(true)
  }

  return (
    <>
      {filteredEvents?.map((event, index) => {
        if (index > 2 && isMonthView) {
          return
        }
        return (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation()
              // console.log(event)
              // openEventSummary(event);
            }}
            className=" w-[90%] max-h-[80px] cursor-pointer rounded-sm bg-[#3B81F6] px-1 text-[11px] text-white leading-[13px]"
            style={getPositionOffEvent(event)}
          >
            <h5>
              {event.services && event.services.length > 0 ? event.services[0].name : ''}
            </h5>
            <p>
              {event.notes}
            </p>
            <div>
            <b>
              {/* starts {event.startDate.format('HH:mm')} */}
            </b>
            <b>
              {/* ends {event.endDate.format('HH:mm')} */}
            </b>
            </div>

          </div>
        )
      })}
      {hasMore && (
        <div
          onMouseUp={handleClickMore}
          className="p-1 w-[90%] cursor-pointer text-sm hover:bg-orange-200 rounded-sm"
        >
          {filteredEvents.length - 3} more
        </div>
      )}
    </>
  )
}

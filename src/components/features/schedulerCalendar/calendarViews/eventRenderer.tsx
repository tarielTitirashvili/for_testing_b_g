import type { EventsArrayElementType } from '@/lib/schedulerEvents'
import type { RootState } from '@/redux/store'
// import { CalendarEventType, useEventStore } from "@/lib/store";

import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { CALENDAR_VIEW_OPTIONS } from '../constants'
import { useRef, useState } from 'react'
import MoreEventsView from './moreEventsView'

type EventRendererProps = {
  date: dayjs.Dayjs
  events: EventsArrayElementType[]
}

export function EventRenderer({ date, events }: EventRendererProps) {
  const hasEventOnTwoDaysRef = useRef<boolean>(false)
  //! for monthView only
  const [showAllEventsForMonthView, setShowAllEventsForMonthView] =
    useState<boolean>(false)

  const selectedView = useSelector(
    (state: RootState) => state.schedulerCalendar.selectedView
  )

  const filteredEvents = events.filter((event: EventsArrayElementType) => {
    const endDate = event.endDate.format('DD-MM-YY HH:mm').split(' ')
    const formattedDate = date.format('DD-MM-YY')
    if (selectedView === CALENDAR_VIEW_OPTIONS[2].value) {
      // monthView
      return (
        event.date.format('DD-MM-YY') === formattedDate ||
        (endDate[0] === formattedDate && endDate[1] !== '00:00')
      )
    } else if (
      selectedView === CALENDAR_VIEW_OPTIONS[0].value ||
      selectedView === CALENDAR_VIEW_OPTIONS[1].value
    ) {
      // week and day views
      if (
        endDate[0] === formattedDate &&
        date.format('HH') === '00' &&
        event.date.format('DD-MM-YY') !== formattedDate &&
        endDate[1] !== '00:00'
      ) {
        hasEventOnTwoDaysRef.current = true
        return true
      } else {
        return event.date.format('DD-MM-YY HH') === date.format('DD-MM-YY HH')
      }
    }
  })

  const calculateEventLengthInMinutes = (event: EventsArrayElementType) => {
    const startOfDay = date.startOf('day')
    //!if event starts yesterday
    if (event.date.isBefore(startOfDay, 'day')) {
      return event.endDate.diff(startOfDay, 'minute')
      //! if event finishes tomorrow
    } else if (event.endDate.isAfter(startOfDay, 'day')) {
      return startOfDay.add(1, 'day').diff(event.date, 'minute')
      //! all other cases
    } else return event.endDate.diff(event.date, 'minute')
  }
  const calculateStartPoint = (event: EventsArrayElementType) => {
    if (hasEventOnTwoDaysRef.current) {
      return 0
    } else {
      return (event.date.minute() / 60) * 100
    }
  }

  const getPositionOffEvent = (event: EventsArrayElementType) => {
    if (selectedView !== CALENDAR_VIEW_OPTIONS[2].value) {
      return {
        top: `${calculateStartPoint(event)}%`,
        zIndex: 10,
        position: 'absolute' as React.CSSProperties['position'],
        height: `${(calculateEventLengthInMinutes(event) / 60) * 100 - 1}%`,
      }
    } else return {}
  }

  //! no bookings
  if (filteredEvents.length < 1) return <></>

  const isMonthView = selectedView === CALENDAR_VIEW_OPTIONS[2].value
  const hasMore = isMonthView && filteredEvents.length > 3

  const handleClickMore = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation()
    setShowAllEventsForMonthView(true)
  }

  const handleClose = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation()
    setShowAllEventsForMonthView(false)
  }

  //! modal for month view 3+ bookings
  if (showAllEventsForMonthView) {
    return (
      <MoreEventsView
        filteredEvents={filteredEvents}
        date={date}
        handleClose={handleClose}
        getPositionOffEvent={getPositionOffEvent}
        showAllEventsForMonthView={showAllEventsForMonthView}
      />
    )
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
            className="line-clamp-1 w-[90%] cursor-pointer rounded-sm bg-[#3B81F6] px-1 text-[11px] text-white leading-[13px]"
            style={getPositionOffEvent(event)}
          >
            {event.title}
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

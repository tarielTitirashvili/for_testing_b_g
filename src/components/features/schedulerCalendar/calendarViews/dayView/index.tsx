import { getHours } from '../../constants'
import dayjs, { Dayjs } from 'dayjs'
import type { OnDayClick } from '..'
import { EventRenderer } from './eventRenderer'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import EmptyResponse from '@/components/shared/emptyResponse'
import { useTranslation } from 'react-i18next'
import PinnedHead from './pinnedHead'
import React, { useEffect, useRef } from 'react'
import TimeTracker from './timeTracker'

type Props = {
  selectedDate: Dayjs
  handleClick: OnDayClick
  calendarEvents: IRootCalendarResponse
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  calendarLoading: boolean
  infiniteScrollPageChangeRef: React.RefObject<boolean>
}

const DayView = (props: Props) => {
  const {
    selectedDate,
    handleClick,
    calendarEvents,
    page,
    setPage,
    calendarLoading,
    infiniteScrollPageChangeRef,
  } = props
  const { t } = useTranslation()

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const pageCounterRef = useRef(page)

  const selectedDateIsToday = selectedDate.isSame(dayjs(), 'day')
  useEffect(() => {
    pageCounterRef.current = page
    if(page === 1){
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0
      }
    }
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (
          (calendarEvents.staff?.pageCount ||
            calendarEvents.tables?.pageCount ||
            0) > pageCounterRef.current &&
          !calendarLoading
        ) {
          infiniteScrollPageChangeRef.current = true
          setPage((p) => p + 1) // load next chunk
        }
      }
    })

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => observer.disconnect()
  }, [])

  const calendarEventsData = calendarEvents.staff?.data.length
    ? calendarEvents.staff?.data
    : calendarEvents.tables?.data

  if (
    calendarEvents.staff?.data?.length === 0 &&
    calendarEvents.tables?.data?.length === 0
  ) {
    return (
      <div className="h-150 flex items-center justify-center">
        <EmptyResponse customMessage={t('business.texts.noBookingWasFound')} />
      </div>
    )
  }
  const maxHeightPx = window.innerHeight * 0.7
  const responseHeightPx = (calendarEventsData?.length || 0) * 100 + 42
  const calculatedHeight =
    maxHeightPx > responseHeightPx ? `h-[${responseHeightPx}px]` : 'h-[70vh]'
  return (
    <div>
      <div
        ref={scrollRef}
        className={`flex w-full ${calculatedHeight} overflow-auto`}
      >
        <div className="sticky left-0 z-30">
          <div className="h-10 min-w-20 p-1 border-y-2 border-[#EBEBEB]"></div>
          <PinnedHead calendarEventsData={calendarEventsData || []} />
        </div>
        <div
          className={'flex flex-col relative'}
          style={{ height: `${responseHeightPx}px` }}
        >
          <div className={'flex sticky top-0 z-31 '}>
            {selectedDateIsToday && (
              <TimeTracker
                selectedDateIsToday={selectedDateIsToday}
                scrollRef={scrollRef}
              />
            )}
            {getHours.map((hour, index) => {
              return (
                <div
                  key={index}
                  className="w-52 h-10 flex items-center bg-[#fff] border-y-2 border-[#EBEBEB]"
                >
                  <div className="origin-bottom-left translate-x-[-50%] text-xs">
                    {hour.format('HH:mm')}
                  </div>
                </div>
              )
            })}
          </div>
          {calendarEventsData?.map((item, index) => {
            return (
              <React.Fragment
                key={`${index} ${'staff' in item ? item.staff.id : null} ${
                  'table' in item ? item.table.name : null
                }`}
              >
                <div className="flex">
                  {getHours.map((hourglass) => {
                    return (
                      <EventRenderer
                        key={hourglass.toString()}
                        events={item.orders}
                        staff={'staff' in item ? item.staff : null}
                        table={'table' in item ? item.table : null}
                        hourglass={hourglass}
                        handleClick={handleClick}
                        date={selectedDate
                          .hour(hourglass.hour())
                          .minute(hourglass.minute())
                          .second(hourglass.second())}
                      />
                    )
                  })}
                </div>
              </React.Fragment>
            )
          })}
          <div className="w-full min-h-0.5" ref={loaderRef}></div>
        </div>
      </div>
    </div>
  )
}

export default DayView

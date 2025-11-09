import { useEffect, useMemo, useState } from 'react'
import { 
  getHours, 
  // getWeekDays 
} from '../../constants'
import dayjs, { Dayjs } from 'dayjs'
// import { ScrollArea } from '@/components/ui/scroll-area'
import type { OnDayClick } from '..'
import {
  // generateCalendarEvents,
  generateCalendarEventsNew,
  type EventsArrayElementType,
} from '@/lib/schedulerEvents'
import { EventRenderer } from '../eventRenderer'

type Props = {
  selectedDate: Dayjs
  handleClick: OnDayClick
  events: EventsArrayElementType[] | []
}

const NewDayView = (props: Props) => {
  const { selectedDate, handleClick } = props
  // const [currentTime, setCurrentTime] = useState(dayjs())

  // const weekDays = useMemo(() => {
  //   return getWeekDays(selectedDate)
  // }, [selectedDate])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(dayjs())
  //   }, 60000)
  //   return clearInterval(interval)
  // }, [])

  // const offsetMinutes = new Date().getTimezoneOffset() // e.g., -240 for GMT+4
  // const offsetHours = -offsetMinutes / 60 // reverse the sign

  // const gmtOffset = 'GMT' + (offsetHours >= 0 ? '+' : '') + offsetHours

  const allEventsNew = useMemo(() => {
    return generateCalendarEventsNew(selectedDate)
  }, [selectedDate])

  const [calendarRowKeys, setCalendarRowKeys] = useState<string[]>([])

  useEffect(() => {
    if (allEventsNew) {
      setCalendarRowKeys(Object.keys(allEventsNew))
    }
  }, [allEventsNew])
  // console.log('allEventsNew', allEventsNew)
  // console.log('keys', Object.keys(allEventsNew))
  console.log(dayjs().startOf('day').format('DD/MMM/YYYY'))
  //[@media(max-width:1402px)]:w-[72vw]
  return (
    <div>
      <div className="flex w-full h-[75vh] overflow-auto ">
        <div className='sticky left-0 z-30'>
          <div className="h-10 border-b-2 border-[#EBEBEB]"></div>
          {calendarRowKeys.map((key, index) => {
            return (
              <div key={index} className="h-25 bg-[#fff] border-b-2 border-r-2 border-[#EBEBEB] flex items-center justify-center">
                {key}
              </div>
            )
          })}
        </div>
        <div className={"flex flex-col relative "} style={{height: `${100*calendarRowKeys.length - 70}px`}}>
          <div className={"flex sticky top-0 z-31 "  }>
            {getHours.map((hour, index) => {
              return (
                <div key={index} className="w-52 h-10 flex items-end bg-[#fff] border-b-2 border-[#EBEBEB]">
                  <div className="origin-bottom-left translate-x-[-50%] text-xs">
                    {hour.format('HH:mm')}
                  </div>
                </div>
              )
            })}
          </div>
          {calendarRowKeys.map((key, index) => {
            return (
              <div key={index} className='flex'>
                {getHours.map((Hourglass, index) => {
                  return (
                    <div
                      key={`${index}`}
                      className="h-25 w-52 border-b-1 border-r-2 border-[#EBEBEB] pointer hover:bg-gray-50 flex relative items-center justify-center"
                      onClick={() => {
                        handleClick(Hourglass)
                        console.log('Hourglass', Hourglass.format('HH:mm'))
                      }}
                    >
                      <EventRenderer
                        events={
                          allEventsNew[key]
                        }
                        date={selectedDate
                          .hour(Hourglass.hour())
                          .minute(Hourglass.minute())
                          .second(Hourglass.second())}
                      />
                    </div>
                  )
                })}
                {/* {selectedDate && (
                <div
                className={'absolute z-20 h-0.5 w-full bg-red-500'}
                style={{
                  top: `${
                    ((currentTime.hour() * 60 + currentTime.minute()) /
                    1440) *
                    100
                    }%`,
                    }}
                    />
                    )} */}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NewDayView

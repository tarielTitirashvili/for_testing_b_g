import { useEffect, useMemo, useState } from 'react'
import { getHours, getWeekDays } from '../../constants'
import dayjs, { Dayjs } from 'dayjs'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { OnDayClick } from '..'
import { generateCalendarEvents, type EventsArrayElementType } from '@/lib/schedulerEvents'
import { EventRenderer } from '../eventRenderer'

type Props = {
  selectedDate: Dayjs
  handleClick: OnDayClick
  events: EventsArrayElementType[] | []
}

const WeekView = (props: Props) => {
  const { selectedDate, handleClick } = props
  const [currentTime, setCurrentTime] = useState(dayjs())

  const weekDays = useMemo(() => {
    return getWeekDays(selectedDate)
  }, [selectedDate])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs())
    }, 60000)
    return clearInterval(interval)
  }, [])

  const offsetMinutes = new Date().getTimezoneOffset() // e.g., -240 for GMT+4
  const offsetHours = -offsetMinutes / 60 // reverse the sign

  const gmtOffset = 'GMT' + (offsetHours >= 0 ? '+' : '') + offsetHours

  const allEvents = useMemo(() => {
    return generateCalendarEvents('week', selectedDate.startOf('week'))
  }, [selectedDate])

  return (
    <div>
      <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] place-items-center px-4 py-2">
        <div className="w-16 border-r border-gray-300">
          <div className="relative h-16">
            <div className="absolute top-2 text-xs text-gray-600">
              {gmtOffset}
            </div>
          </div>
        </div>
        {weekDays.map(({ currentDate, today }, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(currentDate)}
              className="flex flex-col items-center"
            >
              <div className={`text-xs ${today ? 'text-[#EF7800]' : ''}`}>
                {currentDate.format('ddd')}
              </div>
              <div
                className={`text-xs w-5 h-5 flex justify-center items-center ${
                  today ? 'rounded-full bg-[#EF7800] text-[#fff]' : ''
                }`}
              >
                {currentDate.format('D')}
              </div>
            </div>
          )
        })}
      </div>
      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] place-items-center px-4 py-2">
          {/* week days */}
          <div className="w-16 border-r border-gray-300">
            {getHours.map((hour, index) => {
              return (
                <div key={index} className="relative h-16">
                  <div className="absolute top-0 text-xs">
                    {hour.format('HH:mm')}
                  </div>
                </div>
              )
            })}
          </div>
          {/* hours mapped */}
          {weekDays.map(({ currentDate, today }, i) => {
            return (
              <div
                key={i}
                className="relative w-full cursor-pointer border-r-1 border-[#EBEBEB]"
              >
                {getHours.map((Hourglass, index) => {
                  return (
                    <div
                      key={`${index} ${i}`}
                      className="h-16 w-full border-t-1 border-[#EBEBEB] pointer hover:bg-gray-50 flex flex-col gap-0.5 relative"
                      onClick={() => {
                        console.log('today', today)
                        console.log('currentDate', currentDate.format('D/MM'))
                        console.log('Hourglass', Hourglass.format('HH:mm'))
                      }}
                    >
                      <EventRenderer
                        events={allEvents[`${currentDate.format('DD/MM/YYYY')}`]}
                        date={currentDate
                          .hour(Hourglass.hour())
                          .minute(Hourglass.minute())
                          .second(Hourglass.second())}
                      />
                    </div>
                  )
                })}
                {today && (
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
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

export default WeekView

import { ScrollArea } from '@/components/ui/scroll-area'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { getHours } from '../../constants'
import type { OnDayClick } from '..'
import type { EventsArrayElementType } from '@/lib/schedulerEvents'
import { EventRenderer } from '../eventRenderer'

type Props = {
  selectedDate: dayjs.Dayjs
  handleClick: OnDayClick
  events: EventsArrayElementType[] | []
}

const DayView = (props: Props) => {
  const { selectedDate, handleClick, events } = props

  const [currentTime, setCurrentTime] = useState(dayjs())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs())
    }, 60000)
    return clearInterval(interval)
  }, [])

  const isToday = selectedDate.format('DD-MM-YY') === dayjs().format('DD-MM-YY')

  return (
    <>
      <div className="grid grid-cols-[auto_auto_1fr] px-4">
        <div className="w-16 border-r border-gray-300 text-xs">GMT +2</div>
        <div className="flex w-16 flex-col items-center">
          <div className={`text-xs ${isToday ? 'text-[#EF7800]' : ''}`}>
            {selectedDate.format('ddd')}{' '}
          </div>
          <div
            className={`h-12 w-12 rounded-full p-2 text-2xl ${
              isToday
                ? 'bg-[#EF7800] text-[#fff] rounded-full flex items-center justify-center'
                : ''
            }`}
          >
            {selectedDate.format('D')}
          </div>
        </div>
        <div></div>
      </div>
      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-[auto_1fr] p-4">
          <div className="w-16 border-r border-gray-300">
            {getHours.map((hour, index) => (
              <div key={index} className="relative h-16">
                <div className="absolute -top-2 text-xs text-gray-600">
                  {hour.format('HH:mm')}
                </div>
              </div>
            ))}
          </div>
          {/* Day/Boxes Column */}
          <div className="relative border-r border-t border-gray-300">
            {getHours.map((hour, i) => {
              return (
                <div
                  key={i}
                  className={
                    'relative flex h-16 cursor-pointer flex-col items-center gap-y-2 border-b border-gray-300 hover:bg-gray-100'
                  }
                  onClick={() => handleClick(selectedDate, hour)}
                >
                  <EventRenderer
                    events={events}
                    date={selectedDate
                      .hour(hour.hour())
                      .minute(hour.minute())
                      .second(hour.second())}
                  />
                </div>
              )
            })}

            {/* Current time indicator */}
            {isToday && (
              <div
                className={'absolute z-20 h-0.5 w-full bg-red-500'}
                style={{
                  top: `${
                    ((currentTime.hour() * 60 + currentTime.minute()) / 1440) *
                    100
                  }%`,
                }}
              />
            )}
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

export default DayView

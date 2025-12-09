import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

type Props = {
  scrollRef: React.RefObject<HTMLDivElement | null>
  selectedDateIsToday: boolean
}

const TimeTracker = (props: Props) => {
  const { scrollRef, selectedDateIsToday } = props
  const [currentDate, setCurrentDate] = useState<number>()


  const currentTimeOffset = (minutesSinceMidnight?: number) => {
    const now = dayjs()
    const pixelsPerMinute = 208 / 60 // each slot is h-10 = 40px high
    const result =
      (minutesSinceMidnight || now.diff(now.startOf('day'), 'minute')) *
      pixelsPerMinute
    setCurrentDate(result)
    return result
  }

  useEffect(() => {
    if (scrollRef?.current && selectedDateIsToday) {
      // Scroll so that the red line appears nicely in the view
      scrollRef.current.scrollLeft = currentTimeOffset() - 130
    }
  }, [selectedDateIsToday])

  useEffect(() => {
    // update immediately on mount
    setCurrentDate(currentTimeOffset())

    // update every minute
    const interval = setInterval(() => {
      if (selectedDateIsToday) {
        console.log('interval')
        setCurrentDate(currentTimeOffset())
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute left-0 right-0 h-10 w-1 bg-red-500 z-50 rounded-2xl"
      style={{ left: `${currentDate}px` }}
    />
  )
}

export default TimeTracker

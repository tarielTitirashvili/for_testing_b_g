import type { Dayjs } from 'dayjs'
import type dayjs from 'dayjs'
import DayView from './dayView'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'

type Props = {
  selectedDate: Dayjs
  calendarEvents: IRootCalendarResponse
}

export type OnDayClick = (day: dayjs.Dayjs, hour?: dayjs.Dayjs) => void;

const CalendarView = (props: Props) => {
  const { selectedDate, calendarEvents } = props

  const handleClick: OnDayClick = (day, hour) => {
    console.log('day',day)
    console.log('hour',hour)
  }

  return <div>
    <div>
      <DayView selectedDate={selectedDate} handleClick={handleClick} calendarEvents={calendarEvents} />
    </div>
  </div>
}

export default CalendarView

// import MonthView from './monthView'
// import { useSelector } from 'react-redux'
// import type { RootState } from '@/redux/store'
// import DayView from './dayView'
// import WeekView from './weekView'
import type { Dayjs } from 'dayjs'
import type dayjs from 'dayjs'
import { generateDailyOneHourEvents } from '@/lib/schedulerEvents'
import { useMemo } from 'react'
import NewDayView from './newDayView'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'

type Props = {
  selectedDate: Dayjs
  calendarEvents: IRootCalendarResponse
}

export type OnDayClick = (day: dayjs.Dayjs, hour?: dayjs.Dayjs) => void;

const CalendarView = (props: Props) => {
  const { selectedDate, calendarEvents } = props
  // const selectedView = useSelector(
  //   (state: RootState) => state.schedulerCalendar.selectedView
  // )
  console.log(calendarEvents)
  const handleClick: OnDayClick = (day, hour) => {
    console.log('day',day)
    console.log('hour',hour)
  }
  const memoisedEvents = useMemo(()=>{
    return generateDailyOneHourEvents()
  },[])

  // const renderView = () => {
  //   switch (selectedView) {
  //     case 'day':
  //       return <DayView events={memoisedEvents} selectedDate={selectedDate} handleClick={handleClick} />
  //     case 'week':
  //       return <WeekView events={memoisedEvents} selectedDate={selectedDate} handleClick={handleClick}/>
  //     case 'month':
  //       return <MonthView events={memoisedEvents} selectedDate={selectedDate} handleClick={handleClick}/>
  //     default:
  //       return <div>Invalid View</div>
  //   }
  // }

  return <div>
    {/* {renderView()} */}
    <div>
      <NewDayView events={memoisedEvents} selectedDate={selectedDate} handleClick={handleClick} />
    </div>
  </div>
}

export default CalendarView

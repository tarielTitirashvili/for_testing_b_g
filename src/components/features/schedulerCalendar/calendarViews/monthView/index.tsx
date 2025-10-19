import { Fragment, useMemo } from 'react'
import { getMonth } from '../../constants'
import 'dayjs/locale/ka'
import MonthViewBox from './monthViewBox'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import type { Dayjs } from 'dayjs'
import type { OnDayClick } from '..'
import type { EventsArrayElementType } from '@/lib/schedulerEvents'

type Props = {
  selectedDate: Dayjs
  handleClick: OnDayClick
  events: EventsArrayElementType[] | []
  
}

const MonthView = (props: Props) => {
  const {  handleClick, events } = props
  const selectedMonthIndex = useSelector(
    (state: RootState) => state.schedulerCalendar.selectedMonthIndex
  )
  // console.log('selectedDateLocale',selectedDate)
  // console.log(selectedDate.month(), 'monthIndex')

  const monthArray = useMemo(
    () => getMonth(selectedMonthIndex),
    [selectedMonthIndex]
  )
  // console.table(monthArray)
  return (
    <div className="grid grid-cols-7 grid-rows-5 h-[90vh]">
      {monthArray.map((week, index) => {
        return (
          <Fragment key={index}>
            {week.map((day, i) => {
              return <MonthViewBox events={events} handleClick={handleClick} day={day} key={i} rowIndex={index} />
            })}
          </Fragment>
        )
      })}
    </div>
  )
}

export default MonthView

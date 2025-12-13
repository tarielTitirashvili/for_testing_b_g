import type { RootState } from '@/redux/store'

import { getWeekDays } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedMonthIndex,
  setSelectedMonthIndexBy,
  // setSelectedView,
} from '@/redux/business/schedulerCalendar/schedulerCalendarSlice'
import dayjs, { Dayjs } from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { useTranslation } from 'react-i18next'
// import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import DayRenderer from './dayRenderer'

type Props = {
  calendarLoading: boolean
  selectedDate: Dayjs
  handleSetSelectedDate: (date: Dayjs)=>void
}

const SchedulerCalendarHeaderLeftSide = (props: Props) => {
  const { calendarLoading, selectedDate, handleSetSelectedDate } = props

  const selectedMonthIndex = useSelector(
    (state: RootState) => state.schedulerCalendar.selectedMonthIndex
  )
  const dispatch = useDispatch()
  const weekDays = getWeekDays(selectedDate)

  const checkMonth = (
    date: dayjs.Dayjs,
    direction?: 'increase' | 'decrees'
  ) => {
    if (date.month() !== selectedMonthIndex) {
      // when direction not provided we use today or something like it which might differentiate more then 1 months
      switch (direction) {
        case 'increase':
          dispatch(setSelectedMonthIndexBy(1))
          break
        case 'decrees':
          dispatch(setSelectedMonthIndexBy(-1))
          break
        default:
          dispatch(setSelectedMonthIndex(date.month()))
          break
      }
    }
  }

  const leftClick = (period: 'week' | 'month') => {
    if (!calendarLoading) {
      switch (period) {
        case 'month': // month
          dispatch(setSelectedMonthIndexBy(-1))
          handleSetSelectedDate(selectedDate.subtract(1, 'month'))
          break
        case 'week': // week
          checkMonth(selectedDate.subtract(1, 'week'), 'decrees')
          handleSetSelectedDate(selectedDate.subtract(1, 'week'))
          break
        default:
          break
      }
    }
  }

  const rightClick = (period: 'week' | 'month') => {
    if (!calendarLoading) {
      switch (period) {
        case 'month': // month
          dispatch(setSelectedMonthIndexBy(1))
          handleSetSelectedDate(selectedDate.add(1, 'month'))
          break
        case 'week': // week
          checkMonth(selectedDate.add(1, 'week'), 'increase')
          handleSetSelectedDate(selectedDate.add(1, 'week'))
          break
        default:
          break
      }
    }
  }

  const buttonClassName =
    'h-8.5 rounded-full p-1 flex justify-center align-middle border-1 border-[#F4F5F5] cursor-pointer hover:bg-[#EF7800] hover:text-[#fff]'
  return (
    <div className="flex items-center w-full">
      <div className="flex pr-2">
        <div onClick={() => leftClick('month')} className={buttonClassName}>
          <ChevronLeft />
        </div>
        <span className="flex items-center whitespace-nowrap">
          {dayjs().month(selectedMonthIndex).format('MMMM YYYY')}
        </span>
        <div onClick={() => rightClick('month')} className={buttonClassName}>
          <ChevronRight />
        </div>
      </div>
      <div className="flex gap-1.5 flex-1 items-center">
        <div onClick={() => leftClick('week')} className={buttonClassName}>
          <ChevronLeft />
        </div>
        <div className="flex gap-2 flex-1">
          {weekDays.map((day) => {
            return (
              <DayRenderer
                key={day.date.format('YYYY-MM-DD')}
                day={day}
                handleSetSelectedDate={handleSetSelectedDate}
                isSelectedDate={
                  selectedDate.format('YYYY-MM-DD') ===
                  day.date.format('YYYY-MM-DD')
                }
              />
            )
          })}
        </div>
        <div onClick={() => rightClick('week')} className={buttonClassName}>
          <ChevronRight />
        </div>
      </div>
    </div>
  )
}

export default SchedulerCalendarHeaderLeftSide

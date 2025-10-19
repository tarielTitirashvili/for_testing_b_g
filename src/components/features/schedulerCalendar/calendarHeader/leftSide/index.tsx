import type { RootState } from '@/redux/store'

import DropdownSelect from '@/components/shared/inputs/dropdownSelect'
import { CALENDAR_VIEW_OPTIONS } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedMonthIndex,
  setSelectedMonthIndexBy,
  setSelectedView,
} from '@/redux/business/schedulerCalendar/schedulerCalendarSlice'
import dayjs, { Dayjs } from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'

type Props = {
  selectedDate: Dayjs
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>
}

const SchedulerCalendarHeaderLeftSide = (props: Props) => {
  const { selectedDate, setSelectedDate } = props

  const { t } = useTranslation()

  const selectedView = useSelector(
    (state: RootState) => state.schedulerCalendar.selectedView
  )
  const selectedMonthIndex = useSelector(
    (state: RootState) => state.schedulerCalendar.selectedMonthIndex
  )
  const dispatch = useDispatch()

  const handleChangeSelectedView = <T extends string>(value: T) => {
    dispatch(setSelectedView(value))
  }
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

  const leftClick = () => {
    switch (selectedView) {
      case CALENDAR_VIEW_OPTIONS[2].value: // month
        dispatch(setSelectedMonthIndexBy(-1))
        setSelectedDate(selectedDate.subtract(1, 'month'))
        break
      case CALENDAR_VIEW_OPTIONS[1].value: // week
        checkMonth(selectedDate.subtract(1, 'week'), 'decrees')
        setSelectedDate(selectedDate.subtract(1, 'week'))
        break
      case CALENDAR_VIEW_OPTIONS[0].value: // day
        checkMonth(selectedDate.subtract(1, 'day'), 'decrees')
        setSelectedDate(selectedDate.subtract(1, 'day'))
        break
      default:
        break
    }
  }

  const rightClick = () => {
    switch (selectedView) {
      case CALENDAR_VIEW_OPTIONS[2].value: // month
        dispatch(setSelectedMonthIndexBy(1))
        setSelectedDate(selectedDate.add(1, 'month'))
        break
      case CALENDAR_VIEW_OPTIONS[1].value: // week
        checkMonth(selectedDate.add(1, 'week'), 'increase')
        setSelectedDate(selectedDate.add(1, 'week'))
        break
      case CALENDAR_VIEW_OPTIONS[0].value: // day
        checkMonth(selectedDate.add(1, 'day'), 'increase')
        setSelectedDate(selectedDate.add(1, 'day'))
        break
      default:
        break
    }
  }

  const handleClickToday = () => {
    switch (selectedView) {
      case CALENDAR_VIEW_OPTIONS[2].value:
        dispatch(setSelectedMonthIndex(dayjs().month()))
        break
      default:
        setSelectedDate(dayjs())
        checkMonth(dayjs().add(1, 'day'))
        break
    }
  }

  return (
    <div className="flex items-center">
      <span className="p-1">
        <PrimaryButton className="bg-[#EF7800] text-[#fff] px-4 py-1.5" handleClick={handleClickToday}>
          {t('calendar.text.today')}
        </PrimaryButton>
      </span>
      <div className="flex pr-2">
        <div
          onClick={leftClick}
          className="hover:bg-gray-100 rounded-full p-1 flex justify-center align-middle"
        >
          <ChevronLeft />
        </div>
        <div
          onClick={rightClick}
          className="hover:bg-gray-100 rounded-full p-1 flex justify-center align-middle"
        >
          <ChevronRight />
        </div>
        <span className='flex items-center'>{dayjs().month(selectedMonthIndex).format('MMMM YYYY')}</span>
      </div>
      <DropdownSelect
        value={selectedView}
        options={CALENDAR_VIEW_OPTIONS}
        onChange={handleChangeSelectedView}
      />
    </div>
  )
}

export default SchedulerCalendarHeaderLeftSide

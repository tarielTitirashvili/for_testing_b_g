import { useState } from 'react'
import DateTimeSlider from './DateTimeSlider'
import dayjs from 'dayjs'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const days = Array.from({ length: 31 }, (_, i) => i + 1)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i)

const today = new Date()
const currentMonthIndex = today.getMonth()
const currentDayIndex = today.getDate() - 1
const currentYearIndex = years.indexOf(currentYear)

type TParams = {
  day?: string | number
  month?: string | number
  year?: string | number
}

type TProps = {
  onChange?: (date: dayjs.Dayjs) => void
  date?: dayjs.Dayjs
}

const DatePickerScroll = (props: TProps) => {
  const { onChange = () => {}, date } = props

  const [month, setMonth] = useState<string>(
    date !== undefined ? months[date.month()] : months[currentMonthIndex]
  )
  const [day, setDay] = useState<number>(
    date !== undefined ? date.date() : days[currentDayIndex]
  )
  const [year, setYear] = useState<number>(
    date !== undefined ? date.year() : currentYearIndex
  )

  const selectedDate = (params: TParams) => {
    return dayjs(
      `${params.year || year}-${params.month || month}-${
        params.day || day
      }`,
      'YYYY-MMMM-D'
    )
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
  }

  return (
    <div className="flex items-center justify-between">
      <DateTimeSlider
        initialIndex={date?.month() || currentMonthIndex}
        list={months}
        onSelect={(val) => {
          setMonth(val.toString())
          onChange(selectedDate({ month: val }))
        }}
      />
      <DateTimeSlider
        initialIndex={date !== undefined ? days.indexOf(day): currentDayIndex}
        list={days}
        onSelect={(val) => {
          setDay(+val)
          onChange(selectedDate({ day: val }))
        }}
      />
      <DateTimeSlider
        initialIndex={
          date !== undefined ? years.indexOf(date?.year()) : currentYearIndex
        }
        list={years}
        onSelect={(val) => {
          setYear(+val)
          onChange(selectedDate({ year: val }))
        }}
      />
    </div>
  )
}

export default DatePickerScroll

import type dayjs from 'dayjs'

type Props = {
  day: {
    date: dayjs.Dayjs
    isCurrentDay: boolean
    isFarFromToday: boolean
    isBeforeToday: boolean
  }
  handleSetSelectedDate: (date: dayjs.Dayjs)=>void
  isSelectedDate: boolean
}

const DayRenderer = (props: Props) => {
  const {day, handleSetSelectedDate, isSelectedDate} = props

  const handleClickDay = () => {
    if(day.isFarFromToday) return
    handleSetSelectedDate(day.date)
  }

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 cursor-pointer
        max-w-35.5 max-h-14 flex-1 hover:bg-[#FFB366] hover:text-[#fff] hover:border-[#FFB366]
        rounded-lg p-2 ${isSelectedDate ? 'bg-[#EF7800]! text-[#fff] border-[#EF7800]!' : ''}
        ${day.isBeforeToday && !isSelectedDate ? 'hover:opacity-100 bg-[#F4F5F5] border-[#F4F5F5]' : ''}
        ${day.isCurrentDay && !isSelectedDate ? 'border-[#EF7800]' : 'border-transparent'}
        ${day.isFarFromToday ? 'opacity-50 hover:bg-[#F4F5F5]! hover:text-[#242424]! hover:border-[#F4F5F5]! cursor-not-allowed!' : ''}
        `}
      onClick={handleClickDay}
    >
      <div>{day.date.format('ddd')}</div>
      <div>{day.date.format('D')}</div>
    </div>
  )
}

export default DayRenderer
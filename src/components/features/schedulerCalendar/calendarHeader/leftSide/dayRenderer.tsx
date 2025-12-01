import type dayjs from 'dayjs'

type Props = {
  day: {
    date: dayjs.Dayjs
    isCurrentDay: boolean
    isFarFromToday: boolean
  }
  setSelectedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>
  isSelectedDate: boolean
}

const DayRenderer = (props: Props) => {
  const {day, setSelectedDate, isSelectedDate} = props

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 cursor-pointer
        max-w-35.5 max-h-14 flex-1 hover:bg-[#FFB366] hover:text-[#fff] hover:border-[#FFB366]
        rounded-lg p-2 ${isSelectedDate ? 'bg-[#EF7800] text-[#fff] border-[#EF7800]' : ''}
        ${day.isCurrentDay && !isSelectedDate ? 'border-[#EF7800]' : 'border-transparent'}`}
      onClick={() => setSelectedDate(day.date)}
    >
      <div>{day.date.format('ddd')}</div>
      <div>{day.date.format('D')}</div>
    </div>
  )
}

export default DayRenderer
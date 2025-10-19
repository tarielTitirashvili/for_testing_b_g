import dayjs from 'dayjs'
import type { OnDayClick } from '..'
import { EventRenderer } from '../eventRenderer'
import type { EventsArrayElementType } from '@/lib/schedulerEvents'

type Props = {
  day: dayjs.Dayjs
  rowIndex: number
  handleClick: OnDayClick
  events: EventsArrayElementType[] | []
}

const MonthViewBox = (props: Props) => {
  const { day, rowIndex, handleClick, events } = props
  const dayjsDay = dayjs(day)

  const isToday = day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')

  return (
    <div
      className="border border-[#EBEBEB] hover:bg-gray-50 p-1"
      onClick={() => {
        handleClick(day)
      }}
    >
      {rowIndex === 0 && (
        <h3 className={`text-center ${isToday ? 'text-[#EF7800]' : ''}`}>
          {dayjsDay.format('ddd')}
        </h3>
      )}
      <div className="flex justify-center">
        <h3
          className={`flex justify-center items-center w-8 h-8  ${
            isToday ? 'rounded-full bg-[#EF7800] text-[#fff]' : ''
          }`}
        >
          {dayjsDay.date()}
        </h3>
      </div>
      <div className="pt-1 flex flex-col gap-0.5 relative">
        <EventRenderer events={events} date={day} />
      </div>
    </div>
  )
}

export default MonthViewBox

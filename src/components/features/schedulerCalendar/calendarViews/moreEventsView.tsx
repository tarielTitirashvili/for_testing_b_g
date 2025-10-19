import { useDetectOutsideClick } from '@/hooks/useDetectOutsideClick'
import type { EventsArrayElementType } from '@/lib/schedulerEvents'
import dayjs from 'dayjs'
import { X } from 'lucide-react'
import type { CSSProperties } from 'react'

type Props = {
  date: dayjs.Dayjs
  handleClose: () => void
  showAllEventsForMonthView: boolean
  filteredEvents: EventsArrayElementType[]
  getPositionOffEvent: (event: EventsArrayElementType) => CSSProperties
}

const MoreEventsView = (props: Props) => {
  const {
    showAllEventsForMonthView,
    handleClose,
    date,
    filteredEvents,
    getPositionOffEvent,
  } = props
  const ref = useDetectOutsideClick(handleClose, showAllEventsForMonthView)
  const isToday = date.format('DD-MM-YY') === dayjs().format('DD-MM-YY')

  return (
    <span
      ref={ref}
      className="absolute top-[-80px] left-[-14px] rounded-xl bg-gray-100 p-2 w-[120%] shadow-sm"
    >
      <div className="flex items-center gap-[12px] mb-2 justify-around">
        <span
          className={`h-8 w-8 rounded-full p-2 text-xl ${
            isToday
              ? 'bg-[#EF7800] text-[#fff] rounded-full flex items-center justify-center'
              : ''
          }`}
        >
          {date.format('D')}
        </span>
        <span>{date.format('MMM')}</span>
        <span onClick={handleClose}>
          <X size={18} />
        </span>
      </div>
      <span className="max-h-44 flex flex-col overflow-auto dropdown-scrollbar">
        {filteredEvents?.map((event) => {
          return (
            <div
              key={event.id}
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="line-clamp-1 min-h-3 w-full cursor-pointer rounded-sm bg-[#3B81F6] px-1 text-[11px] text-white leading-[13px] mb-0.5"
              style={getPositionOffEvent(event)}
            >
              {event.title}
            </div>
          )
        })}
      </span>
    </span>
  )
}

export default MoreEventsView

import { getHours } from '../../constants'
import { Dayjs } from 'dayjs'
import type { OnDayClick } from '..'
import { EventRenderer } from '../eventRenderer'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import EmptyResponse from '@/components/shared/emptyResponse'
import { useTranslation } from 'react-i18next'

type Props = {
  selectedDate: Dayjs
  handleClick: OnDayClick
  calendarEvents: IRootCalendarResponse
}

const DayView = (props: Props) => {
  const { selectedDate, handleClick, calendarEvents } = props
  const { t } = useTranslation()

  const calendarEventsData = calendarEvents.staff.length
    ? calendarEvents.staff
    : calendarEvents.tables


  if (calendarEvents.staff.length === 0 && calendarEvents.tables.length === 0) {
    return (
      <div className="h-150 flex items-center justify-center">
        <EmptyResponse customMessage={t('business.texts.noBookingWasFound')} />
      </div>
    )
  }

  return (
    <div>
      <div className="flex w-full h-[75vh] overflow-auto ">
        <div className="sticky left-0 z-30">
          <div className="h-10 border-b-2 border-[#EBEBEB]"></div>
          {/* tariel this need to be separate component */}
          {calendarEventsData.map((item) => {
            const name =
              'staff' in item
                ? `${item.staff.firstName} ${item.staff.lastName}`
                : item.table.name
            const id = 'staff' in item ? item.staff.id : item.table.id
            return (
              <div
                key={id}
                className="h-25 bg-[#fff] border-b-2 border-r-2 border-[#EBEBEB] flex items-center justify-center"
              >
                {name}
              </div>
            )
          })}
          {/* tariel this need to be separate component */}
        </div>
        <div
          className={'flex flex-col relative '}
          style={{ height: `${100 * 0 - 70}px` }}
        >
          <div className={'flex sticky top-0 z-31 '}>
            {getHours.map((hour, index) => {
              return (
                <div
                  key={index}
                  className="w-52 h-10 flex items-end bg-[#fff] border-b-2 border-[#EBEBEB]"
                >
                  <div className="origin-bottom-left translate-x-[-50%] text-xs">
                    {hour.format('HH:mm')}
                  </div>
                </div>
              )
            })}
          </div>
          {calendarEventsData.map((item, index) => {
            return (
              <div key={index} className="flex">
                {getHours.map((Hourglass, index) => {
                  return (
                    <div
                      key={`${index}`}
                      className="h-25 w-52 border-b-1 border-r-2 border-[#EBEBEB] pointer hover:bg-gray-50 flex relative items-center justify-center"
                      onClick={() => {
                        handleClick(Hourglass)
                        console.log('Hourglass', Hourglass.format('HH:mm'))
                      }}
                    >
                      <EventRenderer
                        events={item.orders}
                        date={selectedDate
                          .hour(Hourglass.hour())
                          .minute(Hourglass.minute())
                          .second(Hourglass.second())}
                      />
                    </div>
                  )
                })}
                {/* {selectedDate && (
                <div
                className={'absolute z-20 h-0.5 w-full bg-red-500'}
                style={{
                  top: `${
                    ((currentTime.hour() * 60 + currentTime.minute()) /
                    1440) *
                    100
                    }%`,
                    }}
                    />
                    )} */}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DayView

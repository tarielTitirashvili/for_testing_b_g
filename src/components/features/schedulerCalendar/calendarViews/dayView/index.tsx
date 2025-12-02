import { getHours } from '../../constants'
import { Dayjs } from 'dayjs'
import type { OnDayClick } from '..'
import { EventRenderer } from './eventRenderer'
import type { IRootCalendarResponse } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import EmptyResponse from '@/components/shared/emptyResponse'
import { useTranslation } from 'react-i18next'
import PinnedHead from './pinnedHead'

type Props = {
  selectedDate: Dayjs
  handleClick: OnDayClick
  calendarEvents: IRootCalendarResponse
}

const DayView = (props: Props) => {
  const { selectedDate, handleClick, calendarEvents } = props
  const { t } = useTranslation()

  const calendarEventsData = calendarEvents.staff?.data.length
    ? calendarEvents.staff?.data
    : calendarEvents.tables?.data

  console.log('calendarEventsData', calendarEventsData)

  if (calendarEvents.staff?.data?.length === 0 && calendarEvents.tables?.data?.length === 0 ) {
    return (
      <div className="h-150 flex items-center justify-center">
        <EmptyResponse customMessage={t('business.texts.noBookingWasFound')} />
      </div>
    )
  }

  return (
    <div>
      <div className={`flex w-full h-[${calendarEventsData?.length || 0 * 100 + 10}px] overflow-auto`}>
        <div className="sticky left-0 z-30">
          <div className="h-10 min-w-20 p-1 border-b-2 border-[#EBEBEB]"></div>
          <PinnedHead calendarEventsData={calendarEventsData || []} />
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
          {calendarEventsData?.map((item, index) => {
            return (
              <div key={index} className="flex">
                {getHours.map((Hourglass, index) => {
                  return (
                    <div
                      key={`${index}`}
                      className="h-25 w-52 border-b-1 border-r-2 border-[#EBEBEB] pointer flex relative items-center justify-center"
                      onClick={() => {
                        handleClick(Hourglass)
                        console.log('Hourglass', Hourglass.format('HH:mm'))
                      }}
                    >
                      <EventRenderer
                        events={item.orders}
                        staff={ 'staff' in item ? item.staff : null }
                        table={ 'table' in item ? item.table : null }
                        date={selectedDate
                          .hour(Hourglass.hour())
                          .minute(Hourglass.minute())
                          .second(Hourglass.second())}
                      />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DayView

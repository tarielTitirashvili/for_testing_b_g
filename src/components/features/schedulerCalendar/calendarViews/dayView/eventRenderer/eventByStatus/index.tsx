import React from 'react'
import type { IStaff } from '@/redux/business/booking/bookingAPISlice'
import type {
  IOrder,
  ITableInfo,
} from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import usersForCalendar from '@/../public/assets/images/usersForCalendar.svg'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'

type Props = {
  event: IOrder
  staff: IStaff | null
  table?: ITableInfo | null
  getPositionOffEvent(event: IOrder): React.CSSProperties
}

const EventByStatus = (props: Props) => {
  const { event, staff, table, getPositionOffEvent } = props

  const backgroundColor = (id: number) => {
    switch (id) {
      case 2: // pending
        return '#FBF1D0'
      case 3: // confirmed
        return '#E5EFFF'
      case 4: //completed
        return '#E6F9ED'
      case 5: // cancelled
        return '#FDE9E9'
      case 6: // cancelledBySystem
        return '#FDE9E9'
      case 7: // DontShowUp
        return '#F0E7FD'
      case 8: // DontShowUpBySystem
        return '#F0E7FD'
      default:
        return '#D3D3D3'
    }
  }
  const lineColor = (id: number) => {
    switch (id) {
      case 2: // pending
        return '#EAB305'
      case 3: // confirmed
        return '#3B81F6'
      case 4: //completed
        return '#21C55D'
      case 5: // cancelled
        return '#E81C1C'
      case 6: // cancelledBySystem
        return '#E81C1C'
      case 7: // DontShowUp
        return '#6011D0'
      case 8: // DontShowUpBySystem
        return '#6011D0'
      default:
        return '#A9A9A9'
    }
  }

  const stylesBasedOnStatus = {
    backgroundColor: backgroundColor(event.status.id),
    lineColor: lineColor(event.status.id),
  }

  return (
    <div
      key={event.id}
      onClick={(e) => {
        e.stopPropagation()
        // console.log(event)
        // openEventSummary(event);
      }}
      className={`w-[90%] max-h-[90px] cursor-pointer rounded-sm px-2 py-2 text-[11px] text-white leading-[13px] flex gap-3 items-center`}
      style={{
        ...getPositionOffEvent(event),
        backgroundColor: stylesBasedOnStatus.backgroundColor,
      }}
    >
      <div
        style={{ backgroundColor: stylesBasedOnStatus.lineColor }}
        className="rounded-full w-0.75 h-[100%]"
      ></div>
      <div className="h-[100%] max-w-[160px] flex-1 text-[#242424] flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-base leading-[20px]">
            {staff !== null
              ? `${staff?.firstName} ${staff?.lastName}`
              : `${table?.name}`}
          </p>
          {event.services && event.services.length > 0 ? (
            <div className="flex gap-1.5">
              <img src={usersForCalendar} alt="Users" />
              <p className="text-sm leading-[18px]">
                {event.services?.map((service) => service.name).join(', ')}{' '}
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
        <PrimaryButton
          className={'bg-[#fff] w-full rounded-full h-6.5 font-medium text-sm'}
          style={{ color: stylesBasedOnStatus.lineColor }}
        >
          {event.status.name}
        </PrimaryButton>
      </div>
    </div>
  )
}

export default EventByStatus

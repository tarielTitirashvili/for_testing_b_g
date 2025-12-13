import React, { useEffect, useRef, useState } from 'react'
import type { IStaff } from '@/redux/business/booking/bookingAPISlice'
import type {
  IOrder,
  ITableInfo,
} from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import usersForCalendar from '@/../public/assets/images/usersForCalendar.svg'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import gegmioLogo from '/assets/images/gegmio.svg'
import { useTranslation } from 'react-i18next'

type Props = {
  event: IOrder
  staff: IStaff | null
  table?: ITableInfo | null
  getPositionOffEvent(event: IOrder): React.CSSProperties
}

const EventByStatus = (props: Props) => {
  const { event, getPositionOffEvent } = props

  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isButtonVisible, setIsButtonVisible] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      const containerWidth = containerRef.current!.clientWidth
      const minNeededForButton = 40 // px (your chosen threshold)

      if (containerWidth < minNeededForButton + 32 /* gegmio logo size */) {
        setIsButtonVisible(false)
      } else {
        setIsButtonVisible(true)
      }
    })

    resizeObserver.observe(containerRef.current)

    return () => resizeObserver.disconnect()
  }, [])

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
      className={
        'w-[90%] max-h-[90px] cursor-pointer rounded-sm px-1.5 py-2 text-[11px] text-white leading-[13px] flex gap-3 items-center border-l-4 overflow-hidden'
      }
      style={{
        ...getPositionOffEvent(event),
        backgroundColor: stylesBasedOnStatus.backgroundColor,
        borderLeftColor: stylesBasedOnStatus.lineColor,
      }}
    >
      <div className="h-[100%] max-w-[200px] w-full flex-1 text-[#242424] flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-base leading-[20px] overflow-hidden whitespace-nowrap text-ellipsis">
            {event?.client.firstName} {event.client.lastName}
          </p>
          <div className="flex gap-1.5">
            <img src={usersForCalendar} alt="Users" />
            <p className="text-sm leading-[18px] overflow-hidden whitespace-nowrap text-ellipsis">
              {event.services?.length
                ? event.services?.map((service) => service.name).join(', ')
                : `${event.guestCount} ${t('space.card.guestCnt')}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full" ref={containerRef}>
          <PrimaryButton
            className={`bg-[#fff] w-full rounded-full h-6.5 font-medium text-[10px] overflow-hidden whitespace-nowrap text-ellipsis justify-start ${
              isButtonVisible ? 'flex-1' : 'hidden'
            }`}
            style={{ color: stylesBasedOnStatus.lineColor }}
          >
            {event.status.name}
          </PrimaryButton>
          {!event.isExternal && (
            <span className="bg-[linear-gradient(90deg,#FF3033,#EF7800)] rounded-2xl px-1 py-2 w-6 h-6">
              <img src={gegmioLogo} alt="Gegmio" className="w-[34px]" />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventByStatus

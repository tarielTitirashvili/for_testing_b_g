import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useTranslation } from 'react-i18next'
import {
  getRelativeDayLabel,
  lineColorByBookingStatus,
  transformToLocalDate,
} from '../constants'
import type { TClickedFilteredBookingsRef } from '@/pages/business/calendar'
import { Clock, User } from 'lucide-react'
import tableOutside from '@/../public/assets/images/tableOutside.svg'
import tableInside from '@/../public/assets/images/tableInside.svg'
import StatusBadge, { type BadgeVariant } from '@/components/shared/buttons/BookingStatusBadges'
import { BOOKING_STATUS_LABELS_BY_ID } from '@/pages/business/bookings/constants'

type Props = {
  isOpen: boolean
  clickedFilteredBookingsRef: React.RefObject<TClickedFilteredBookingsRef | null>
  setIsOpen: (status: boolean) => void
}

const MoreBookingsModal = (props: Props) => {
  const { isOpen, clickedFilteredBookingsRef, setIsOpen } = props
  const { t } = useTranslation()
  const staff = clickedFilteredBookingsRef.current?.staff
  const table = clickedFilteredBookingsRef.current?.table

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="booking_modal bg-white max-w-[500px] w-full rounded-md py-8 px-6 flex flex-col gap-6">
        <DialogTitle>
          {t('business.schedulerCalendar.bookings.modalTitle')}
        </DialogTitle>
        {clickedFilteredBookingsRef.current?.events?.map((booking) => {
          const startDate = transformToLocalDate(booking.startDate)
          const status: { label: string; variant: BadgeVariant } =
            BOOKING_STATUS_LABELS_BY_ID[
              booking.status.id as keyof typeof BOOKING_STATUS_LABELS_BY_ID
            ]
          return (
            <div
              key={booking.id}
              className="border-2 rounded-2xl p-3 flex flex-col gap-2"
              style={{
                borderColor: lineColorByBookingStatus(booking.status.id),
              }}
            >
              <div className="flex w-full justify-between">
                <p className="text-[#242424] font-medium text-sm">
                  {booking.client.firstName} {booking.client.lastName}
                </p>
                <span className="flex gap-1 items-center">
                  {staff && (
                    <>
                      {staff.file?.url ? (
                        <img
                          className="w-4"
                          src={staff.file?.url}
                          alt="profile picture"
                        />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <p className="text-xs text-[#242424]">
                        {staff.firstName} {staff.lastName}
                      </p>
                    </>
                  )}
                  {table && (
                    <>
                      <img
                        className="w-4"
                        src={
                          table.category.tableCategoryTypeId === 2
                            ? tableOutside
                            : tableInside
                        }
                        alt="profile picture"
                      />
                      <p className="text-xs text-[#242424]">{table.name}</p>
                    </>
                  )}
                </span>
              </div>
              <div className="flex gap-3 items-center justify-between">
                <span className="flex gap-3">
                  <span className="flex gap-2">
                    <img
                      className="w-3.5"
                      src="/assets/images/date.svg"
                      alt="date icon"
                    />
                    <p className="text-sm text-[#242424]">
                      {getRelativeDayLabel(startDate)}
                    </p>
                  </span>
                  <span className="flex gap-2 items-center">
                    <Clock className="w-4" />
                    <p className="text-sm text-[#242424]">
                      {startDate.format('HH:mm')}
                    </p>
                  </span>
                </span>
                <div>
                  <p className="text-sm text-[#242424]">
                    {booking?.services?.length ? booking.services[0].name : ''}
                  </p>
                </div>
              </div>
              <div className="latest_book_item-status min-w-[280px] w-full">
                <StatusBadge
                  variant={status.variant}
                  label={t(status.label)}
                  className="h-[26px] w-[123px]  2xl:h-[30px] 2xl:w-[133px]"
                />
              </div>
            </div>
          )
        })}
      </DialogContent>
    </Dialog>
  )
}

export default MoreBookingsModal

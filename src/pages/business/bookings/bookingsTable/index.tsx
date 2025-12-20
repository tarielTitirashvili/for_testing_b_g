import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { type BookingType } from '../constants'

import type { IConfirmBookingPayload } from '@/redux/business/booking/bookingAPISlice'

import EmptyResponse from '@/components/shared/emptyResponse'
import Loader from '@/components/shared/loader'

import TableRows from './tableRows'
import TableSkeletonRow from './tableSkeletonRow'

type Props = {
  setDataCount: React.Dispatch<React.SetStateAction<number>>
  ordersScrollRef: React.RefObject<boolean>
  totalCount: number
  bookings: BookingType[]
  businessType: 1 | 2 | null
  bookingsLoadingError: boolean
  loadingBookings: boolean
  confirmationMutation: (payload: IConfirmBookingPayload) =>void
  cancelBookingMutation: (payload: IConfirmBookingPayload) =>void
  changeNoShowStatusMutation: (orderId: number) => void
}

const BookingsTable = (props: Props) => {
  const { setDataCount, ordersScrollRef, totalCount, bookings, businessType, bookingsLoadingError, loadingBookings, confirmationMutation, cancelBookingMutation, changeNoShowStatusMutation } = props
  const { t } = useTranslation()

  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingBookings) {

        if (bookings.length >= totalCount) {
          observer.disconnect()
          return
        }

        if (!ordersScrollRef.current) {
          ordersScrollRef.current = true
          setDataCount((prev) => prev + 10)
        }
      }
    })

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => observer.disconnect()

  }, [loadingBookings, bookings.length, totalCount, ordersScrollRef])

  useEffect(() => {
    ordersScrollRef.current = false
  }, [bookings])

  const tableHeadRenderer = (children: React.ReactNode) => (
    <TableHead className="text-[12px] 2xl:text-base text-[#6C6C6C]">{children}</TableHead>
  )

  if(bookingsLoadingError){
    return <h6>{t('business.texts.thereWasError')}</h6>
  }

  if(bookings.length === 0 && !loadingBookings){
    return <EmptyResponse />
  }

  return (
    <Loader loading={loadingBookings} >
      <Table>
        <TableHeader>
          <TableRow>
            {(() => {
              switch (businessType) {
                case 1:
                  return (
                    <>
                      {tableHeadRenderer('ID')}
                      {tableHeadRenderer(t('bookings.table.date&time'))}
                      {tableHeadRenderer(t('bookings.table.guest'))}
                      {tableHeadRenderer(t('bookings.table.guestCount'))}
                      {tableHeadRenderer(t('bookings.table.tableName'))}
                      {tableHeadRenderer(t('bookings.table.status'))}
                      {tableHeadRenderer(t('bookings.table.actions'))}
                    </>
                  )
                  case 2:
                    return (
                      <>
                      {tableHeadRenderer('ID')}
                      {tableHeadRenderer(t('bookings.table.date&time'))}
                      {tableHeadRenderer(t('bookings.table.guest'))}
                      {tableHeadRenderer(t('bookings.table.service'))}
                      {tableHeadRenderer(t('bookings.teamMembers.title'))}
                      {tableHeadRenderer(t('bookings.table.duration'))}
                      {tableHeadRenderer(t('bookings.table.price'))}
                      {tableHeadRenderer(t('bookings.table.status'))}
                      {tableHeadRenderer(t('bookings.table.actions'))}
                    </>
                  )
                  default:
                    return null
                  }
                })()}
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* skeletons */}
          {
            loadingBookings && bookings.length === 0 && Array.from({ length: 10 }, (_, i) => i).map(i=>{
              return  <TableSkeletonRow key={i} />
            })
          }
          {/* data mapping */}
          {bookings.map((booking) => {
            return <TableRows 
              booking={booking}
              key={booking.UId}
              businessType={businessType}
              confirmationMutation={confirmationMutation}
              cancelBookingMutation={cancelBookingMutation}
              changeNoShowStatusMutation={changeNoShowStatusMutation}
            />
          })}
          

        </TableBody>
      </Table>
      <div ref={loaderRef}></div>
      {bookings.length > 0 && bookings.length !== totalCount && (
        <Loader />
      )}
    </Loader>
  )
}

export default BookingsTable
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { type BookingType } from '../constants'

import { useTranslation } from 'react-i18next'

import TableRows from './tableRows'
import EmptyResponse from '@/components/shared/emptyResponse'
import Loader from '@/components/shared/loader'
import TableSkeletonRow from './tableSkeletonRow'
import type { IConfirmBookingPayload } from '@/redux/business/booking/bookingAPISlice'

type Props = {
  bookings: BookingType[]
  businessType: 1 | 2 | null
  bookingsLoadingError: boolean
  loadingBookings: boolean
  confirmationMutation: (payload: IConfirmBookingPayload) =>void
}

const BookingsTable = (props: Props) => {
  const { bookings, businessType, bookingsLoadingError, loadingBookings, confirmationMutation } = props
  const { t } = useTranslation()

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
            return <TableRows booking={booking} key={booking.UId} businessType={businessType} confirmationMutation={confirmationMutation} />
          })}
        </TableBody>
      </Table>
    </Loader>
  )
}

export default BookingsTable

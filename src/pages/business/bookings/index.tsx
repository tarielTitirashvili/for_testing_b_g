import { useTranslation } from 'react-i18next'

import { useConfirmBookingMutation, useGetAllOrdersQuery } from '@/redux/business/booking/bookingAPISlice'
import { useSelector } from 'react-redux'
import { selectedBusinessProfileSelector } from '@/redux/auth/authSelectors'

import BookingFilters from './bookingFilters'
import BookingsTable from './bookingsTable'
import SmartBooking from './smartBooking'
import AddBookingModal from '@/components/features/addBookingModal'
import { useState } from 'react'

const Bookings = () => {

  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const selectedBusinessProfile = useSelector(selectedBusinessProfileSelector)

  const {data, isLoading, isError } = useGetAllOrdersQuery()
  const [confirmationMutation, {isLoading: isConfirmationLoading} ] = useConfirmBookingMutation()

  const businessType = selectedBusinessProfile?.businessCategory?.id

  const bookingsTableData =
    data?.data.map((order, index) => {
      const base = {
        UId: index + 1,
        dateTime: order.startDate,
        customer: `${order.client.firstName ?? ''} ${order.client.lastName ?? ''}`.trim(),
        phone: order.client.phoneNumber ?? '-',
        status: order.statusId.id,
        id: order.id
      }

      if (businessType === 1) {
        return {
          ...base,
          guestsAmount: order.guestCount ?? 0,
          table: order.tableCategoryId !== null ? `Table ${order.tableCategoryId}` : '-',
        }
      } else if (businessType === 2) {
        return {
          ...base,
          service: order.services.map(s => s.name).join(', ') || '-',
          teamMember: `${order.staff.firstName ?? ''} ${order.staff.lastName ?? ''}`.trim() || '-',
          duration: `${order.durationMinutes} წთ`,
          price: order.price ? `$${order.price}` : '-',
        }
      }

      return base
  }) ?? []
  console.log(bookingsTableData)
  return (

    <div className="rounded-md flex flex-col gap-6 max-w-full">

      <div className="p-5 flex w-full justify-between items-center h-full">
        <SmartBooking />
        <AddBookingModal
          isOpen={isOpen}
          onOpenChange={(openState: boolean) => {
            setIsOpen(openState)
          }}
        />
      </div>

      <BookingFilters />

      <div className="rounded-md border border-[#eee] p-4 bg-[#fff]">
        {data && data.data.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold">
              {t('bookings.title.bookings')}&nbsp; ({data.data.length})
            </h2>
          </div>
        )}
        <BookingsTable
          bookingsLoadingError={isError}
          loadingBookings={isLoading || isConfirmationLoading}
          bookings={bookingsTableData ?? []} 
          businessType={selectedBusinessProfile?.businessCategory ? selectedBusinessProfile?.businessCategory.id : null} 
          confirmationMutation={confirmationMutation}
        />
      </div>

    </div>
  )
}

export default Bookings

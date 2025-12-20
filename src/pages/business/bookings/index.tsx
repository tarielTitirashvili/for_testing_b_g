import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useCancelBookingMutation, useChangeNoShowStatusMutation, useConfirmBookingMutation, useGetAllOrdersQuery } from '@/redux/business/booking/bookingAPISlice'
import { useSelector } from 'react-redux'
import { selectedBusinessProfileSelector } from '@/redux/auth/authSelectors'

import { Plus } from 'lucide-react'

import BookingFilters from './bookingFilters'
import BookingsTable from './bookingsTable'
import SmartBooking from './smartBooking'
import AddBookingModal from '@/components/features/addBookingModal'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'

const Bookings = () => {

  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const selectedBusinessProfile = useSelector(selectedBusinessProfileSelector)

  const [dataCount, setDataCount] = useState<number>(10)
  const ordersScrollRef = useRef<boolean>(false)

  const {data, isLoading, isError } = useGetAllOrdersQuery({ page: 1, offset: dataCount })

  const [confirmationMutation, {isLoading: isConfirmationLoading} ] = useConfirmBookingMutation()
  const [cancelBookingMutation, {isLoading: isCancelLoading}] = useCancelBookingMutation()
  const [changeNoShowStatusMutation] = useChangeNoShowStatusMutation()

  const businessType = selectedBusinessProfile?.businessCategory?.id

  const bookingsTableData =
    data?.data.map((order, index) => {
      const base = {
        UId: index + 1,
        dateTime: order.startDate,
        customer: `${order.client?.firstName || "მომხმარებელი"} ${order.client?.lastName || ""}`.trim(),
        phone: order?.client?.phoneNumber || 'არაა მითითებული',
        status: order.statusId.id,
        id: order.id
      }

      if (businessType === 1) {
        return {
          ...base,
          guestsAmount: order.guestCount ?? 0,
          table: order.table !== null ? order.table?.name : 'ვერ მოიძებნა',
        }
      } else if (businessType === 2) {
        return {
          ...base,
          service: order.services.map(s => s.name).join(', ') || '-',
          teamMember: `${order.staff?.firstName ?? ''} ${order.staff?.lastName ?? ''}`.trim() || '-',
          duration: `${order.durationMinutes} წთ`,
          price: order.price ? `$${order.price}` : '-',
        }
      }

      return base
  }) ?? []

  return (

    <div className="rounded-md flex flex-col gap-6 max-w-full">

      <div className="p-5 flex w-full justify-between items-center h-full">
        <SmartBooking />
        <div>
          <div onClick={() => setIsOpen(true)}>
            <PrimaryButton><Plus className='w-3.5' />{t('business.buttons.addNewBooking')}</PrimaryButton>
          </div>
          <AddBookingModal
            businessType={selectedBusinessProfile?.businessCategory.id}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>  

      <BookingFilters />

      <div className="rounded-md border border-[#eee] p-4 bg-[#fff]">
        {data && data.data.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold">
              {t('bookings.title.bookings')} ({data.totalItemCount})
            </h2>
          </div>
        )}
        <BookingsTable
          setDataCount={setDataCount}
          ordersScrollRef={ordersScrollRef}
          totalCount={data?.totalItemCount || 0}
          bookingsLoadingError={isError}
          loadingBookings={isLoading || isConfirmationLoading || isCancelLoading}
          bookings={bookingsTableData ?? []} 
          businessType={selectedBusinessProfile?.businessCategory ? selectedBusinessProfile?.businessCategory.id : null} 
          confirmationMutation={confirmationMutation}
          cancelBookingMutation={cancelBookingMutation}
          changeNoShowStatusMutation={changeNoShowStatusMutation}
        />
      </div>

    </div>
  )
}

export default Bookings
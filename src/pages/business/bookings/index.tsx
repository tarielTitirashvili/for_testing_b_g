import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import BookingFilters from './bookingFilters'
import BookingsTable from './bookingsTable'
import { BOOKINGS_ARRAY } from './constants'
import SmartBooking from './smartBooking'

const Bookings = () => {
  const { t } = useTranslation()

  return (
    <div className="rounded-md flex flex-col gap-6 max-w-full">
      <div className="p-5 flex w-full justify-between items-center h-full">
        <SmartBooking />
        <PrimaryButton className="max-w-35">
          <Plus />
          {t('bookings.button.add')}
        </PrimaryButton>
      </div>
      <BookingFilters />
      <div className="rounded-md border border-[#eee] p-4 bg-[#fff]">
        {BOOKINGS_ARRAY.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold">
              {t('bookings.title.bookings')}&nbsp; ({BOOKINGS_ARRAY.length})
            </h2>
          </div>
        )}
        <BookingsTable bookings={BOOKINGS_ARRAY} />
      </div>
    </div>
  )
}

export default Bookings

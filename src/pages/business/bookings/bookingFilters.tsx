import { Search, SlidersHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import TextInput from '@/components/shared/inputs/TextInput'
import DropdownSelect from '@/components/shared/inputs/dropdownSelect'
import { BOOKING_STATUS_OPTIONS, BOOKING_TIME_OPTIONS } from './constants'

const BookingFilters = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-start gap-4 justify-between p-6 rounded-xl bg-[#fff]">
      <div className="w-full flex gap-2">
        <SlidersHorizontal />
        {t('bookings.title.filter')}
      </div>
      <div className="flex gap-4 w-full items-center flex-wrap">
        <label className="text-[14px] flex flex-col gap-2 grow">
          <p className='font-medium'>
            {t('bookings.button.search')}
          </p>
          <div className="reviews_header-search relative text-[#6C6C6C] w-full">
            <Search
              className="absolute top-[55%] -translate-y-1/2 left-2.5"
              size={15}
            />
            <TextInput
              placeholder={t('bookings.button.search')}
              className="pl-7.5 w-full border-[#EBEBEB]"
            />
          </div>
        </label>
        <label className="text-[14px] flex flex-col gap-2 grow">
          <p className='font-medium'>
            {t('bookings.statusOptions.title')}
          </p>
          <DropdownSelect
            options={BOOKING_STATUS_OPTIONS}
            onChange={() => {}}
            value={2}
          />
        </label>
        <label className="text-[14px] flex flex-col gap-2 grow">
          <p className='font-medium'>
            {t('bookings.timeOptions.title')}
          </p>
          <DropdownSelect
            options={BOOKING_TIME_OPTIONS}
            onChange={() => {}}
            value={2}
          />
        </label>
        <label className="text-[14px] flex flex-col gap-2 grow">
          <p className='font-medium'>
            {t('bookings.teamMembers.title')}
          </p>
          <DropdownSelect
            options={BOOKING_TIME_OPTIONS}
            onChange={() => {}}
            value={2}
          />
        </label>
      </div>
    </div>
  )
}

export default BookingFilters

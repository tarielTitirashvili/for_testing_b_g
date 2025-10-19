// import { useState } from 'react'
import BookingHoursRow from './bookingHoursRow'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Control } from 'react-hook-form'
import type { UseFormGetValues } from 'react-hook-form'
import type { IBusinessFormData, TBusinessBookingTime } from '@/pages/business/businessProfile/BusinessProfile'

interface TProps {
  handleExpand?: (section: string) => void
  days?: TBusinessBookingTime[]
  control?: Control<IBusinessFormData>
  getValues?: UseFormGetValues<IBusinessFormData>
}

const BookingHours = (props: TProps) => {
  const { handleExpand, days, control, getValues } = props
  const { t } = useTranslation()

  const handleRowClick = () => {
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="business_profile-time_picker-title text-lg font-semibold flex justify-between items-center">
        <div className="title">{t('businessProfile.bookingTime.title')}</div>
        <div
          className="expand_btn flex sm:hidden"
          onClick={() => handleExpand && handleExpand('bookingTimes')}
        >
          <ChevronDown className={`transition-transform duration-300`} />
        </div>
      </div>
      <div className="mw-[780px] gap-2 flex flex-col mt-1">
        {days?.map((day: TBusinessBookingTime, index: number) => {
          return (
            <BookingHoursRow
              key={day.id}
              index={index}
              onClick={handleRowClick}
              control={control}
              name={day.name}
              getValues={getValues!}
            />
          )
        })}
      </div>
    </div>
  )
}

export default BookingHours

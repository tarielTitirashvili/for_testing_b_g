import CustomCheckbox from '@/components/shared/customCheckbox'
import { TimePickerDropdown } from '@/components/shared/timePickerDropdown'
// import { HALF_HOUR_TIME_INTERVALS } from '@/components/utils/halfHourIntervalsGenerator'
import type { IBusinessFormData } from '@/pages/business/businessProfile/BusinessProfile'
import { useState } from 'react'
import { Controller, type Control, type UseFormGetValues } from 'react-hook-form'

type Props = {
  // options?: string[]
  onClick?:()=>void
  // startTime: string
  // endTime: string
  name: string
  control?: Control<IBusinessFormData>
  index: number
  getValues: UseFormGetValues<IBusinessFormData>
}

const BookingHoursRow = (props: Props) => {
  const { onClick, name, control, index, getValues } = props
  const forceUpdate = useState(0)
  const checkedStatus: boolean = getValues(`businessBookingTime.${index}.isActive`)
  // const obj = getValues('businessBookingTime')
  // console.log('forceUpdate', forceUpdate)
  // console.log('businessBookingTime',obj)
  
  return (
    <div
      className={`!select-none border-1 min-h-13.5 gap-2 border-#EBEBEB rounded-sm py-2 px-3 flex flex-wrap w-full justify-between align-middle  transition-all ${
        checkedStatus ? 'border-button-color' : ''
      }`}
    >
      <Controller
        name={`businessBookingTime.${index}.isActive`}
        control={control}
          render={({ field }) => (
            <CustomCheckbox
              checked={field.value}
              id={name}
              label={name}
              clickChecked={() => {
                field.onChange(!field.value)
                forceUpdate[1](prev=>prev+1)
                if (onClick) onClick()
              }}
            />
          )}
      />
      {checkedStatus ? (
        <span className="flex flex-wrap gap-2 align-middle text-center animate-in fade-in zoom-in-95 duration-200">
          <Controller
            name={`businessBookingTime.${index}.bookingStartTime`}
            control={control}
            render={({ field }) => (
              <TimePickerDropdown
                value={field.value}
                handleSelectOption={field.onChange}
              />
            )}
          />
          <p className="text-center text-sm leading-9 font-normal font-#6C6C6C">
            to
          </p>
          <Controller
            name={`businessBookingTime.${index}.bookingEndTime`}
            control={control}
            render={({ field }) => (
              <TimePickerDropdown
                value={field.value}
                handleSelectOption={field.onChange}
              />
            )}
          />
        </span>
      ) : (
        <p className="text-#6C6C6C text-sm font-normal leading-9 animate-in fade-in zoom-in-95 duration-200">Closed</p>
      )}
    </div>
  )
}

export default BookingHoursRow


import { Input } from '@/components/ui/input'
import type dayjs from 'dayjs'
import { Calendar, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type TProps = {
  date?: dayjs.Dayjs | string
  label?: string
  inputContainerClassName?: string
  error?: string
}

const DatePickerInput = (props: TProps) => {
  const { label, inputContainerClassName, error, date} = props
  const { t } = useTranslation()

  return (
    <div className="date_picker_input-wrapper flex flex-col gap-2 w-full">
      {label ? (
        label
      ) : (
        <div
          className={`date_picker_input-label text-left text-sm font-medium ${error && 'text-red-500'}`}
        >
          {t('bookings.table.date')}
        </div>
      )}

      <div
        className={`date_picker_input relative w-full h-[48px] flex items-center ${inputContainerClassName}`}
      >
        <div className="date_picker_input-icon absolute left-[10px] top-1/2 -translate-y-1/2">
          <Calendar className="h-6 w-6" />
        </div>
        <div className="date_picker_input-body w-full">
          <Input
            className="date_picker_input-placeholder text-lg pl-10 border-2 rounded-md w-full py-2 flex items-center cursor-pointer"
            placeholder={t("bookings.table.datePick")}
            readOnly
            error={error}
            value={typeof date === 'string' ? date?.toString().split('-').reverse().join(".") : date?.format('DD.MM.YYYY')}
          />
        </div>
        <div className="date_picker_input-dropdown absolute right-[10px] top-1/2 -translate-y-1/2">
          <ChevronDown />
        </div>
      </div>
    </div>
  )
}

export default DatePickerInput

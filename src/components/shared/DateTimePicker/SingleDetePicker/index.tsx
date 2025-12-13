import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

import DatePickerInput from '../../inputs/DatePickerInput'
import PrimaryButton from '../../buttons/PrimaryButton'
import SecondaryButton from '../../buttons/SecondaryButton'
import DatePickerScroll from '../../sliders/DatePickerScroll'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { useState } from 'react'

type TProps = {
  title?: string
  inputContainerClassName?: string
  date: dayjs.Dayjs
  error?: string
  onChange: (date: dayjs.Dayjs) => void
}

export const SingleDatePickComponent = (props: TProps) => {
  const { title, inputContainerClassName, error, date, onChange } = props
  const [localeDate, setLocaleDate] = useState<dayjs.Dayjs>(date)
  const [open, setOpen] = useState(false)

  const { t } = useTranslation()
  const close = () => setOpen(false)

  const handleApplyNewDate = () => {
    onChange(localeDate)
    close()
  }

  return (
    <Dialog open={open}>
      <DialogTrigger
        onClick={() => {
          setOpen(true)
        }}
      >
        <div className="text-left w-full">
          <DatePickerInput
            label={''}
            date={dayjs(date).format('DD/MM/YYYY')}
            error={error}
            inputContainerClassName={inputContainerClassName}
          />
          {error && (
            <span
              className={
                'flex items-center pt-2 gap-1 text-sm font-medium text-red-500'
              }
            >
              {error}
            </span>
          )}
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="datepicker-dialog-content max-w-[320px] w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            {title ? t('admin.datePicker.selectDate') : title}
          </DialogTitle>
        </DialogHeader>
        <div
          className={
            'date_pick-block flex flex-col items-center gap-2.5 overflow-hidden cursor-pointer date_pick-block-expanded'
          }
        >
          <div className="date_pick-component w-full">
            <DatePickerScroll date={localeDate} onChange={setLocaleDate} />
          </div>
        </div>
        <DialogFooter>
          <div className="date_pick-buttons flex flex-col gap-2.5 w-full">
            <div className="date_pick-button ">
              <PrimaryButton children="Save" handleClick={handleApplyNewDate} />
            </div>
            <div className="date_pick-button" onClick={close}>
              <SecondaryButton children="Cancel" />
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
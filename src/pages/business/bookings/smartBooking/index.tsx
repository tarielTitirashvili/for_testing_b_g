import { useState } from 'react'
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'

import TextInput from '@/components/shared/inputs/TextInput'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import SecondaryButton from '@/components/shared/buttons/SecondaryButton'
import { Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface IAddSalonServiceFormData {
  name: string
  price: number
  time: number
  category: string
  imgs: string[]
}

const SmartBooking = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddSalonServiceFormData>()

  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [autoConfirmationView, setAutoConfirmationView] = useState(true)

  const toggleView = () => {
    setAutoConfirmationView(!autoConfirmationView)
  }
  const onSubmit = (data: IAddSalonServiceFormData) => {
    console.log(data)
  }

  return (
    <>
      <SecondaryButton
        onClick={() => setOpen(true)}
        className="bg-[#fff] max-w-50"
      >
        <Settings />
        {t('bookings.button.smart_bookings')}
      </SecondaryButton>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[500px] w-full flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>{t('bookings.button.smart_bookings')}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2 bg-[#EFF0F1] rounded-xl p-3">
            <span
              onClick={toggleView}
              className={`cursor-pointer py-1.5 px-2 rounded-xl bg-[${
                autoConfirmationView ? '#fff' : 'transparent'
              }]`}
            >
              {t('bookings.texts.autoApproval')}
            </span>
            <span
              onClick={toggleView}
              className={`cursor-pointer py-1.5 px-2 rounded-xl bg-[${
                !autoConfirmationView ? '#fff' : 'transparent'
              }]`}
            >
              {t('bookings.texts.autoCancellation')}
            </span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#242424]">
              {t('bookings.texts.weekDays')}
            </h4>
          </div>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <span>
              <TextInput
                type="number"
                label={t('bookings.actionButtons.preBookingRequestedTime')}
                {...register('time', { required: 'Service Time is Required' })}
                error={errors.time?.message}
              />
              <p className="text-xs text-[#6C6C6C]">
                {t(
                  'bookings.actionButtons.preBookingRequestedTime.description'
                )}
              </p>
            </span>
            <div className="form_buttons flex gap-3">
              <DialogClose className="flex-1 w-full border-[#BEBEBE] border-2 rounded-md py-2 cursor-pointer">
                {t('bookings.actionButtons.cancel')}
              </DialogClose>
              <PrimaryButton className="flex-1">
                {t('bookings.actionButtons.save')}
              </PrimaryButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SmartBooking

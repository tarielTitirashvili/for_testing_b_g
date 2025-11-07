import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'

import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import SecondaryButton from '@/components/shared/buttons/SecondaryButton'
import { 
  // Controller, 
  useForm 
} from 'react-hook-form'
import TextInput from '@/components/shared/inputs/TextInput'
// import SelectDropDown from '@/components/shared/inputs/SelectDropDown'
// import { SingleDatePickComponent } from '@/components/shared/DateTimePicker/SingleDetePicker'
// import dayjs from 'dayjs'

type TProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}
export type TCreateReservation = {
  name: string
  phoneNumber: string
  businessId: string
  staffId: string
  guestCount: number
  tableCategoryId: number
  startDate: string // ISO date string
  price: number
  reminder: string // ISO date string
  serviceIds: number[]
  note: string
}

const AddBookingModal = (props: TProps) => {
  const { isOpen, onOpenChange } = props
  const { t } = useTranslation()

  const {
    register,
    // formState: { errors },
    // control,
  } = useForm<TCreateReservation>()


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger
      asChild
        className="flex gap-3"
      >
        <PrimaryButton handleClick={()=>onOpenChange(true)} className="max-w-55">
          <Plus />
          {t('business.buttons.addNewBooking')}
        </PrimaryButton>
      </DialogTrigger>
      <DialogContent aria-description='add new booking' className="max-w-[500px] w-full px-6 py-8 flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex justify-center">
            {t('business.buttons.addNewBooking')}
          </DialogTitle>
        </DialogHeader>
        <form
          // onSubmit={handleSubmit(handleEditAdminUser)}
          className="flex flex-col gap-6"
        >
          <TextInput
            label={t('business.labels.guestName')}
            {...register('name', {
              required: t('business.labels.guestName.required'),
            })}
            // error={errors?.firstName?.message}
          />

          <TextInput
            label={t('business.labels.guestPhone')}
            {...register('phoneNumber', {
              required: t('business.labels.guestPhone.required'),
            })}
            // error={errors?.lastName?.message}
          />

          <TextInput
            label={t('bookings.inputLabel.mobileNumber')}
            {...register('phoneNumber', {
              required: t('bookings.formValidation.required.mobileNumber'),
            })}
            // error={errors?.phoneNumber?.message}
          />
          {/* <Controller
            name="role"
            control={control}
            rules={{ required: t('businessProfile.required.region') }}
            render={({ field }) => (
              <SelectDropDown
                {...field}
                label={t('bookings.inputLabel.address')}
                options={roles ?? []}
                sentId
                value={field.value?.id ?? ''}
                onChange={(e) => {
                  const raw = e.target.value
                  field.onChange(roles?.find((value) => value.id === raw))
                }}
                onBlur={field.onBlur}
                name={field.name}
                // error={errors.role?.message}
              />
            )}
          /> */}
          {/* <Controller
            name="genderId"
            control={control}
            rules={{ required: t('businessProfile.required.region') }}
            render={({ field }) => {
              return (
                <SelectDropDown
                  {...field}
                  label={t('admin.users.gender')}
                  options={genders ?? []}
                  value={
                    field.value
                      ? genders?.find(
                          (gender) => Number(field.value) === gender.id
                        )?.name
                      : ''
                  }
                  onChange={(e) => {
                    const raw = e.target.value
                    console.log(raw)
                    field.onChange(raw)
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  error={errors.role?.message}
                />
              )
            }}
          /> */}

          <div className="form_buttons flex gap-3">
            <SecondaryButton
              onClick={() => onOpenChange(false)}
              className="flex-1 w-full border-[#BEBEBE] border-2 rounded-md py-2 cursor-pointer"
            >
              {t('bookings.button.close')}
            </SecondaryButton>
            <PrimaryButton loading={false} className="flex-1">
              {t('bookings.button.save')}
            </PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddBookingModal

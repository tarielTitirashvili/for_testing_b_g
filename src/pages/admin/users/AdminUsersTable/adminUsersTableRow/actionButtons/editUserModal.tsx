import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  useEditAdminUserMutation,
  type TAdminUsersUserEditParams,
} from '@/redux/admin/usersAPISlice'

import { Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TAdminUsersUser, TGenderOption, TUserRole } from '../../..'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import SecondaryButton from '@/components/shared/buttons/SecondaryButton'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import TextInput from '@/components/shared/inputs/TextInput'
import SelectDropDown from '@/components/shared/inputs/SelectDropDown'
import { SingleDatePickComponent } from '@/components/shared/DateTimePicker/SingleDetePicker'
import dayjs from 'dayjs'

type TProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  adminUser: TAdminUsersUser
  roles: TUserRole[] | undefined
  genders: TGenderOption[] | undefined
}

const EditUserModal = (props: TProps) => {
  const { isOpen, onOpenChange, roles, genders, adminUser } = props
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TAdminUsersUser>({
    defaultValues: {
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      email: adminUser.email,
      birthDate: adminUser.birthDate,
      phoneNumber: adminUser.phoneNumber,
      role: adminUser.role,
      genderId: adminUser.genderId,
    },
  })

  const [editUserMutation, { isLoading, isSuccess }] =
    useEditAdminUserMutation()

  const handleEditAdminUser = (data: TAdminUsersUser) => {
    const editData: TAdminUsersUserEditParams = {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      email: data.email,
      id: adminUser.id,
      roleId: data.role.id,
      isBlocked: data.isBlocked,
      phoneNumber: data.phoneNumber,
      genderId: data.genderId,
    }
    editUserMutation(editData)
  }

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false)
    }
  }, [isSuccess])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger
        onClick={() => onOpenChange(true)}
        className="flex gap-3 w-full"
      >
        <Pencil />
        <p>{t('bookings.actionButtons.edit')}</p>
      </DialogTrigger>
      <DialogContent className="max-w-[500px] w-full px-6 py-8 flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex justify-center">
            {t('bookings.actionButtons.edit')}
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleEditAdminUser)}
          className="flex flex-col gap-6"
        >
          <TextInput
            label={t('services.addService.name')}
            {...register('firstName', {
              required: t('services.addService.required.name'),
            })}
            error={errors?.firstName?.message}
          />

          <TextInput
            label={t('bookings.inputLabel.lastName')}
            {...register('lastName', {
              required: t('services.addService.required.description'),
            })}
            error={errors?.lastName?.message}
          />

          <TextInput
            type="email"
            label={t('bookings.inputLabel.email')}
            autoComplete="email"
            {...register('email', {
              required: t('bookings.formValidation.required.email'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('bookings.formValidation.email'),
              },
            })}
            error={errors.email?.message}
          />
          <Controller
            name="birthDate"
            control={control}
            rules={{ required: t('businessProfile.required.region') }}
            render={({ field }) => {
              const formatted = field.value ? dayjs(field.value) : dayjs()
              return (
                <SingleDatePickComponent
                  {...field}
                  inputContainerClassName={'max-w-[900px]'}
                  date={formatted}
                  onChange={(date: dayjs.Dayjs) => field.onChange(date)}
                  error={errors.role?.message}
                />
              )
            }}
          />

          <TextInput
            label={t('bookings.inputLabel.mobileNumber')}
            {...register('phoneNumber', {
              required: t('bookings.formValidation.required.mobileNumber'),
            })}
            error={errors?.phoneNumber?.message}
          />
          <Controller
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
                error={errors.role?.message}
              />
            )}
          />
          <Controller
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
          />

          <div className="form_buttons flex gap-3">
            <SecondaryButton
              onClick={() => onOpenChange(false)}
              className="flex-1 w-full border-[#BEBEBE] border-2 rounded-md py-2 cursor-pointer"
            >
              {t('bookings.button.close')}
            </SecondaryButton>
            <PrimaryButton loading={isLoading} className="flex-1">
              {t('bookings.button.save')}
            </PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserModal

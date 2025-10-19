import { useEffect, type FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'

import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import TextInput from '@/components/shared/inputs/TextInput'

import { ChevronLeft, LockKeyholeOpen } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useResetPasswordConfirmationRequestMutation } from '@/redux/auth/authAPISlice'
import PasswordInput from '@/components/shared/inputs/PasswordInput'

export interface IResetConfirmationFormData {
  confirmationCode: string
  newPassword: string
  newPasswordConfirm: string
}

const ConfirmResetPassword: FunctionComponent = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetConfirmationFormData>()
  const [resetPasswordConfirmationRequest, { isLoading, isSuccess }] =
    useResetPasswordConfirmationRequestMutation()
  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess])

  const onSubmit = (data: IResetConfirmationFormData): void => {
    console.log('Reset password confirmation data:', data)
    resetPasswordConfirmationRequest(data)
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center flex-1 bg-[#EFF0F1] py-1.5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-[500px] w-full bg-white p-6 rounded-md"
      >
        <div className="form_logo flex items-center justify-center">
          <img
            src="/assets/images/bookItLogo.svg"
            alt="BookIt"
            className="max-w-[34px] max-h-[37px] w-full h-full"
          />
        </div>
        <div className="form_title text-center">
          <p className="text-xl font-bold">
            {t('bookings.title.resetPassword')}
          </p>
          <p className="text-base font-normal text-[#6C6C6C]">
            {t('bookings.subtitle.resetPassword')}
          </p>
        </div>
        <TextInput
          type="text"
          InputIcon={LockKeyholeOpen}
          label={t('bookings.inputLabel.tanCode')}
          {...register('confirmationCode', {
            required: t('bookings.formValidation.required.tanCode'),
            minLength: {
              value: 4,
              message: t('bookings.formValidation.required.tanCode'),
            },
            maxLength: {
              value: 12,
              message: t('bookings.formValidation.required.tanCode'),
            },
          })}
          error={errors.confirmationCode?.message}
        />
        <PasswordInput
          label={t('bookings.inputLabel.newPassword')}
          autoComplete="new-password"
          {...register('newPassword', {
            required: t('bookings.formValidation.required.password'),
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/,
              message: t('bookings.formValidation.passwordRequirements'),
            },
          })}
          error={errors.newPassword?.message}
        />
        <PasswordInput
          label={t('bookings.inputLabel.repeatNewPassword')}
          autoComplete="confirm-new-password"
          {...register('newPasswordConfirm', {
            required: t('bookings.formValidation.required.repeatNewPassword'),
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/,
              message: t('bookings.formValidation.passwordRequirements'),
            },
          })}
          error={errors.newPasswordConfirm?.message}
        />
        <PrimaryButton loading={isLoading}>
          {t('bookings.button.resetPass')}
        </PrimaryButton>
        <Link
          to="/reset-password"
          className="form-return-link flex items-center gap-1 text-[#6C6C6C] font-medium cursor-pointer w-max"
        >
          <ChevronLeft /> <span>{t('bookings.link.backToLogin')}</span>
        </Link>
      </form>
    </div>
  )
}

export default ConfirmResetPassword

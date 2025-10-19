import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import PrimaryButton from '@/components/shared/buttons/PrimaryButton'

import { ChevronLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useChangePasswordRequestMutation } from '@/redux/auth/authAPISlice'
import PasswordInput from '@/components/shared/inputs/PasswordInput'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { logout, otpStepWasPassed } from '@/redux/auth/authSlice'

export interface IChangePasswordFormDataFormData {
  oldPassword: string
  newPassword: string
  newPasswordConfirm: string
}

//! renders when admin registered user and user did not changed automatically generated password yet

const ChangePassword = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordFormDataFormData>()

  const [resetPasswordConfirmationRequest, { isLoading, isSuccess }] =
    useChangePasswordRequestMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isOtp = useSelector((state: RootState) => state.auth.isOTP)
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
      dispatch(otpStepWasPassed())
    }
  }, [isSuccess])

  useEffect(() => {
    const cleanupTokens = () => {
      navigate('/')
      if (isOtp && isAuth) {
        dispatch(logout())
      }
    }
    window.addEventListener('beforeunload', cleanupTokens)

    return () => {
      cleanupTokens()
      window.removeEventListener('beforeunload', cleanupTokens)
    }
  }, [])

  const onSubmit = (data: IChangePasswordFormDataFormData): void => {
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
        <PasswordInput
          label={t('bookings.inputLabel.oldPassword')}
          {...register('oldPassword', {
            required: t('bookings.formValidation.required.tanCode'),
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/,
              message: t('bookings.formValidation.passwordRequirements'),
            },
          })}
          error={errors.oldPassword?.message}
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
          to="/"
          className="form-return-link flex items-center gap-1 text-[#6C6C6C] font-medium cursor-pointer w-max"
        >
          <ChevronLeft /> <span>{t('bookings.link.backToLogin')}</span>
        </Link>
      </form>
    </div>
  )
}

export default ChangePassword

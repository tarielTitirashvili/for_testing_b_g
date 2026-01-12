import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import RememberMeCheckbox from '@/components/shared/inputs/RememberMeCheckbox'
import TextInput from '@/components/shared/inputs/TextInput'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Link, useNavigate } from 'react-router-dom'
import SecondaryButton from '@/components/shared/buttons/SecondaryButton'
import SelectDropDown from '@/components/shared/inputs/SelectDropDown'
import type { TBusinessPossibleCategories } from '@/redux/business/addBusinessBranch/addBusinessBranchAPISlice'

export interface INewBusinessBranchStep1Data {
  name: string
  categoryId: number
}
type TProps = {
  businessPossibleCategories?: TBusinessPossibleCategories[]
  setStep1Data: (data: { name: string; categoryId: number }) => void
}

const Step1 = (props: TProps) => {
  const { businessPossibleCategories, setStep1Data } = props
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<INewBusinessBranchStep1Data>()

  const { t } = useTranslation()
  const navigate = useNavigate()

  const onSubmit = async (data: INewBusinessBranchStep1Data) => {
    setStep1Data(data)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center flex-1 h-full bg-[#EFF0F1] py-1.5">
      <form
        className="flex flex-col gap-6 max-w-[450px] w-full bg-white p-6 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form_title text-center">
          <p className="text-xl font-bold">
            {t('business.addBusinessBranch.title')}
          </p>
          <p className="text-base font-normal text-[#6C6C6C]">
            {t('business.addBusinessBranch.subTitle')}
          </p>
        </div>

        <div className="form_title-input_wrapper">
          <TextInput
            type="text"
            label={t('bookings.inputLabel.BusinessName')}
            autoComplete="username"
            className={errors.name?.message ? 'border-red-500' : ''}
            error={errors.name?.message}
            {...register('name', {
              required: t('bookings.formValidation.nameRequired'),
              minLength: {
                value: 3,
                message: t('bookings.formValidation.minLength', { min: 3 }),
              },
              maxLength: {
                value: 25,
                message: t('bookings.formValidation.maxLength', { max: 25 }),
              },
            })}
          />
        </div>

        <div className="form_title-input_wrapper">
          <SelectDropDown
            className="h-12!"
            label={t('settings.mainSettings.profile.businessCategory')}
            options={businessPossibleCategories || []}
            value={getValues('categoryId')}
            sentId
            {...register('categoryId', {
              required: `${t('bookings.formValidation.businessCategoryRequired')}`,
              setValueAs: (v) => (v ? +v : null),
            })}
            error={errors.categoryId?.message}
            onChange={(e) => {
              setValue('categoryId', +e.target.value)
            }}
          />
        </div>

        <div className="form_params flex items-center justify-between">
          <RememberMeCheckbox />
          <Link
            to="/reset-password"
            className="form_params-forget_pass font-medium text-button-color cursor-pointer"
          >
            {t('bookings.link.forgotPassword')}
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <PrimaryButton loading={false}>
            {t('bookings.addBusinessBranch.verification')}
          </PrimaryButton>
          <SecondaryButton
            onClick={() => {
              navigate(-1)
            }}
          >
            {t('bookings.addBusinessBranch.backToMainPage')}
          </SecondaryButton>
        </div>
      </form>
    </div>
  )
}

export default Step1

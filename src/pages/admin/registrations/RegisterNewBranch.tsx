import type { FunctionComponent } from 'react'

import { useForm, type SubmitHandler } from 'react-hook-form'

import { Link } from 'react-router-dom'

import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import TextInput from '@/components/shared/inputs/TextInput'
// import TermsCheckbox from '@/components/shared/inputs/TermsCheckbox'
// import PhoneInput from '@/components/shared/inputs/PhoneInput'
import SelectDropDown from '@/components/shared/inputs/SelectDropDown'
import { useTranslation } from 'react-i18next'
import { useRegisterBusinessAndOwnerMutation } from '@/redux/auth/authAPISlice'
import { useGetBusinessCategoriesQuery } from '@/redux/business/staticAPISlice/staticAPISlice'
import Loader from '@/components/shared/loader'

interface IRegisterNewBranchFormData {
  businessName: string
  businessCategoryId: number
  // firstName: string
  // lastName: string
  // email: string
  // phoneNumber: string
  ownerUserId: string
  // acceptTerms: boolean
}

export type TRegisterNewBranchCredentials = Omit<
  IRegisterNewBranchFormData,
  'acceptTerms'
>

const RegisterNewBranch: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<IRegisterNewBranchFormData>({
    defaultValues: {
      ownerUserId: '',
    },
  })
  const [createRegistrationMutation, {isLoading}] =
    useRegisterBusinessAndOwnerMutation()

// "4b9bbf2e-0692-4ed6-cbfc-08de05b7b4bc"
  
  const { t } = useTranslation()
  const {
    data: businessCategories,
    isFetching: isFetchingBusinessCategories,
    isLoading: isLoadingBusinessCategories,
    error,
  } = useGetBusinessCategoriesQuery()
  const onSubmit: SubmitHandler<IRegisterNewBranchFormData> = async (data) => {

    createRegistrationMutation(data)
  }

  if (isLoadingBusinessCategories || isFetchingBusinessCategories) {
    return <Loader />
  }
  if(error){
    return <div>Error loading business categories</div>
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-[#EFF0F1] py-2">
      <div className="registration-wrapper flex flex-col gap-6 max-w-[500px] w-full bg-white p-6 rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 max-w-[500px] w-full"
        >
          <div className="form_title text-center">
            <p className="text-xl font-bold">
              {t('registerNewBranch.title')}
            </p>
            {/* <p className="text-base font-normal text-[#6C6C6C]">
              {t('bookings.subtitle.registration')}
            </p> */}
          </div>

          <TextInput
            label={t('bookings.inputLabel.BusinessName')}
            autoComplete="organization"
            {...register('businessName', {
              required: t('bookings.formValidation.required.businessName'),
            })}
            error={errors.businessName?.message}
          />

          <SelectDropDown
            label={t('bookings.inputLabel.BusinessCategory')}
            options={
              businessCategories
                ? businessCategories.map((cat) => ({
                    id: String(cat.id),
                    name: cat.name,
                  }))
                : []
            }
            sentId
            {...register("businessCategoryId", {
                required: t('bookings.formValidation.required.businessCategory'),
                valueAsNumber: true
            })}
            error={errors.businessCategoryId?.message}
        />
          <TextInput
            type="text"
            label={t("bookings.inputLabel.ownerUserId")}
            {...register('ownerUserId')}
            error={errors.ownerUserId?.message}
          />
{/* 
          <TermsCheckbox
            {...register('acceptTerms', {
              required: t('bookings.formValidation.required.businessTerms'),
            })}
            error={errors.acceptTerms?.message}
          /> */}

          <PrimaryButton loading={isLoading}>{t('bookings.button.ownerRegister')}</PrimaryButton>

          <Link
            to="/"
            className="form_sign-in-link border-t-3 w-full flex justify-center items-center gap-2.5 py-2"
          >
            <span>{t('bookings.link.loginQuestion')}</span>
            <span className="text-base font-medium text-[#EF7800] cursor-pointer">
              {t('bookings.link.login')}
            </span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default RegisterNewBranch

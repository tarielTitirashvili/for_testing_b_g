import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import SecondaryButton from '@/components/shared/buttons/SecondaryButton'
import { InputOTPDemo } from '@/components/shared/inputs/otpInput'
import Loader from '@/components/shared/loader'
import {
  useGetInitiateEmailConfirmationQuery,
  useLazyGetForSendingConfirmationCodeQuery,
  useUseRegisterBusinessByOwnerMutation,
} from '@/redux/business/addBusinessBranch/addBusinessBranchAPISlice'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { INewBusinessBranchStep1Data } from './step1'
import createToast from '@/lib/createToast'

type Props = {
  step1Data: INewBusinessBranchStep1Data | null
  setStep: (step: number) => void
  step2WasInitiatedRef: React.RefObject<boolean>
}

const Step2 = (props: Props) => {
  const { step1Data, setStep, step2WasInitiatedRef } = props

  const [OTPValue, setOTPValue] = useState<string>('')
  const { t } = useTranslation()

  const {
    isSuccess: isInitializationSuccess,
    isLoading: isInitializationLoading,
    isFetching: isInitializationFetching,
  } = useGetInitiateEmailConfirmationQuery(undefined, {
    skip: step2WasInitiatedRef.current,
  })

  const [
    getForSendingConfirmationCode,
    {
      isSuccess: isCodeCorrect,
      isLoading: isCheckingCode,
      isFetching: isCheckingCodeFetching,
      isError: incorrectCode,
    },
  ] = useLazyGetForSendingConfirmationCodeQuery()

  const [registerBusinessMutation, { isLoading: isUserCreationProcess, isSuccess: isUserCreated, isError: isUserCreationError }] =
    useUseRegisterBusinessByOwnerMutation()

  const handleClickConfirmButton = () => {
    getForSendingConfirmationCode({ confirmationCode: OTPValue })
  }

  useEffect(() => {
    if (isInitializationSuccess && !step2WasInitiatedRef.current) {
      step2WasInitiatedRef.current = true
    }
  }, [isInitializationSuccess])

  useEffect(() => {
    if (isCodeCorrect && step1Data) {
      registerBusinessMutation(step1Data)
    }
  }, [isCodeCorrect])

  useEffect(()=>{
    if(isUserCreated){
      createToast.success(t('business.addBusinessBranch.newBranchWasAdded'))
      
    }
    if(isUserCreationError){
      createToast.error(t('business.addBusinessBranch.errorOnNewBranchWasAdding'))
    }
  },[isUserCreated, isUserCreationError])

  const loading =
    isInitializationLoading ||
    isInitializationFetching ||
    isCheckingCode ||
    isCheckingCodeFetching ||
    isUserCreationProcess

  return (
    <Loader loading={loading}>
      <div>
        <div className="flex flex-col items-center justify-center flex-1 h-full gap-6 max-w-[450px] w-full bg-white p-6 rounded-md">
          <div className="form_title text-center">
            <p className="text-xl font-bold">
              {t('bookings.addBusinessBranch.verifyEmail.title')}
            </p>
            <p className="text-base font-normal text-[#6C6C6C]">
              {t('bookings.addBusinessBranch.confirmEmailByCode.title')}
            </p>
          </div>
          <div className="form_title text-center">
            <InputOTPDemo
              value={OTPValue}
              setValue={setOTPValue}
              disabled={loading}
            />
            {incorrectCode && (
              <p className="text-red-500 p-2 font-[14px]">
                {t('bookings.formValidation.incorrectCode')}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <PrimaryButton
              handleClick={handleClickConfirmButton}
              loading={false}
            >
              {t('bookings.addBusinessBranch.verification')}
            </PrimaryButton>
            <SecondaryButton
              onClick={() => {
                setStep(1)
              }}
            >
              {t('bookings.button.returnBack')}
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Loader>
  )
}

export default Step2

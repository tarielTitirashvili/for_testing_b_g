// import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
// import SecondaryButton from '@/components/shared/buttons/SecondaryButton'
// import { InputOTPDemo } from '@/components/shared/inputs/otpInput'
// import { useGetEmailConfirmationReadyQuery } from '@/redux/business/addBusinessBranch/addBusinessBranchAPISlice'
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'

// type Props = {}

// const Step2 = (props: Props) => {
//   const { isSuccess, isLoading: isInitializationLoading, isFetching: isInitializationFetching } = useGetEmailConfirmationReadyQuery()
//   const [OPTValue, setOTPValue] = useState<string>('')
//   const navigate = useNavigate()
//   const { t } = useTranslation()

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center flex-1 h-full gap-6 max-w-[450px] w-full bg-white p-6 rounded-md">
//         <div className="form_title text-center">
//           <p className="text-xl font-bold">
//             {t('bookings.addBusinessBranch.verifyEmail.title')}
//           </p>
//           <p className="text-base font-normal text-[#6C6C6C]">
//             {t('bookings.addBusinessBranch.confirmEmailByCode.title')}
//           </p>
//         </div>
//         <div className="form_title text-center">
//           <InputOTPDemo value={OPTValue} setValue={setOTPValue} disabled={isInitializationLoading || isInitializationFetching}/>
//         </div>
//         <div className="flex flex-col gap-3 w-full">
//           <PrimaryButton loading={false} >
//             {t('bookings.addBusinessBranch.verification')}
//           </PrimaryButton>
//           <SecondaryButton
//             onClick={() => {
//               navigate(-1)
//             }}
//           >
//             {t('bookings.addBusinessBranch.backToMainPage')}
//           </SecondaryButton>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Step2

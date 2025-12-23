import { useState, type FunctionComponent } from 'react'

import { useGetBusinessPossibleCategoriesQuery } from '@/redux/business/addBusinessBranch/addBusinessBranchAPISlice'
import Step1, { type INewBusinessBranchStep1Data } from './step1'
// import Step2 from './step2'

const AddBusinessBranch: FunctionComponent = () => {
  const [step1Data, setStep1Data] =
    useState<INewBusinessBranchStep1Data | null>(null)
  const [step, setStep] = useState(1)
  const { data: businessPossibleCategories } = useGetBusinessPossibleCategoriesQuery()

  console.log(businessPossibleCategories)
  console.log(step1Data)

  const handleSubmitStep1Data = (data: INewBusinessBranchStep1Data) =>{
    setStep1Data(data)
    setStep(prev=>prev+1)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center flex-1 h-full bg-[#EFF0F1] py-1.5">
      {step === 1 && <Step1 setStep1Data={handleSubmitStep1Data} businessPossibleCategories={businessPossibleCategories}/>}
      {/* {step === 2 && <Step2 />} */}
    </div>
  )
}

export default AddBusinessBranch

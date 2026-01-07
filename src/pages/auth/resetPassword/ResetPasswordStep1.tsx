import { useEffect, type FunctionComponent } from "react"
import { useForm } from "react-hook-form"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import TextInput from "@/components/shared/inputs/TextInput"

import { ChevronLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useResetPasswordRequestMutation } from '@/redux/auth/authAPISlice'

export interface IResetFormData {
    email: string
}

const ResetPassword: FunctionComponent = () => {
    
    const { t } = useTranslation()
    const { register, handleSubmit, formState: { errors } } = useForm<IResetFormData>()
    const navigate = useNavigate()
    const [resetPasswordRequest, {isLoading, isSuccess}] = useResetPasswordRequestMutation()

    useEffect(()=>{
        if(isSuccess){
            navigate('/confirm-reset-password')
        }
    }, [isSuccess])

    const onSubmit = (data: IResetFormData): void  =>{
        resetPasswordRequest(data)
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center flex-1 bg-[#EFF0F1] py-1.5">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 max-w-[500px] w-full bg-white p-6 rounded-md"
            >
                <div className="form_title text-center">
                    <p className="text-xl font-bold">{ t('bookings.title.resetPassword') }</p>
                    <p className="text-base font-normal text-[#6C6C6C]">{ t('bookings.subtitle.resetPassword') }</p>
                </div>

                <TextInput
                    type="email"
                    label={ t('bookings.inputLabel.email') }
                    autoComplete="email"
                    {...register("email", {
                        required: t('bookings.formValidation.required.email'),
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: t('bookings.formValidation.email'),
                        },
                    })}
                    error={errors.email?.message}
                />

                <PrimaryButton loading={isLoading}>
                    { t('bookings.button.resetPass') }
                </PrimaryButton>

                <Link to='/' className="form-return-link flex items-center gap-1 text-[#6C6C6C] font-medium cursor-pointer w-max">
                    <ChevronLeft /> <span>{ t('bookings.link.backToLogin') }</span>
                </Link>

            </form>

        </div>
    )
}

export default ResetPassword
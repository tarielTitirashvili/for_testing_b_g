import { type FunctionComponent } from "react"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import PasswordInput from "@/components/shared/inputs/PasswordInput"
import RememberMeCheckbox from "@/components/shared/inputs/RememberMeCheckbox"
import TextInput from "@/components/shared/inputs/TextInput"

import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Link } from "react-router-dom"
import { useLoginUserMutation } from '@/redux/auth/authAPISlice'

export interface IAuthFormData {
    email: string
    password: string
}

const Authorization: FunctionComponent = () => {


    const [loginUserMutation, { isLoading, isError }] = useLoginUserMutation()

    const { register, handleSubmit, formState: { errors } } = useForm<IAuthFormData>()
    
    const { t } = useTranslation()

    const onSubmit = async (data: IAuthFormData) => {
        loginUserMutation(data)
    }

    const error = isError ? t('bookings.formValidation.invalidLoginOrPassword') : ''

    return (
        <div className="min-h-screen flex flex-col items-center justify-center flex-1 h-full bg-[#EFF0F1] py-1.5">

            <form
                className="flex flex-col gap-6 max-w-[500px] w-full bg-white p-6 rounded-md"
                onSubmit={handleSubmit(onSubmit)}
            >

                <div className="form_title text-center">
                    <p className="text-xl font-bold">{ t('bookings.title.logIn') }</p>
                    <p className="text-base font-normal text-[#6C6C6C]">{ t('bookings.subtitle.logIn') }</p>
                </div>

                <div className="form_title-input_wrapper">
                    <TextInput
                        type="email"
                        label={ t('bookings.inputLabel.email') }
                        autoComplete="username"
                        className={errors.email?.message || isError! ? 'border-red-500' : ''}
                        error={errors.email?.message || error}
                        {...register("email", {
                            required: t('bookings.formValidation.required.email'),
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: t('bookings.formValidation.email'),
                            },
                        })}
                    />
                </div>

                <div className="form_title-input_wrapper">
                    <PasswordInput
                        label={ t('bookings.inputLabel.password') }
                        className={errors.password?.message || isError! ? 'border-red-500' : ''}
                        error={errors.password?.message || error}
                        {...register("password", {
                            required: t('bookings.formValidation.required.password'),
                            // pattern: {
                            //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/,
                            //     message: t('bookings.formValidation.passwordRequirements'),
                            // }
                        })}
                    />
                </div>
                

                <div className="form_params flex items-center justify-between">
                    <RememberMeCheckbox />
                    <Link to='/reset-password' className="form_params-forget_pass font-medium text-button-color cursor-pointer">
                        {t('bookings.link.forgotPassword')}
                    </Link>
                </div>

                <PrimaryButton loading={isLoading}>
                    { t('bookings.button.login') }
                </PrimaryButton>

                <Link to='/registration' className="form_sign-up-link border-t-3 w-full flex justify-center items-center gap-2.5 py-2">
                    <span>{ t('bookings.link.createAccQuestion') }</span>
                    <span className="text-base text-button-color font-medium cursor-pointer">{ t('bookings.link.createAcc') }</span>
                </Link>


            </form>

        </div>
    )
}

export default Authorization
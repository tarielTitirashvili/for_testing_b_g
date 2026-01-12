import type { FunctionComponent } from "react";

import { useForm, type SubmitHandler } from "react-hook-form";

import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import TextInput from "@/components/shared/inputs/TextInput";
import TermsCheckbox from "@/components/shared/inputs/TermsCheckbox";
import { Link } from "react-router-dom";
import PhoneInput from "@/components/shared/inputs/PhoneInput";
import PasswordInput from "@/components/shared/inputs/PasswordInput";
import { useTranslation } from "react-i18next";

interface IRegistrationFormData {
    businessName: string;
    ownerName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    category: string;
    acceptTerms: boolean;
}

type RegistrationCredentialsType = Omit<IRegistrationFormData, 'acceptTerms'>

const StaffRegistration: FunctionComponent = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm<IRegistrationFormData>();

    const { t } = useTranslation('')

    const onSubmit: SubmitHandler<RegistrationCredentialsType> = (data) => {
        console.log(data)
    };

    const password = watch("password");

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 max-w-[500px] w-full"
        >
            <div className="form_title text-center">
                <p className="text-xl font-bold">{ t('bookings.title.registration') }</p>
                <p className="text-base font-normal text-[#6C6C6C]">
                    { t('bookings.subtitle.registration') }
                </p>
            </div>

            <TextInput
                label={t('bookings.inputLabel.businessCode')}
                autoComplete="name"
                {...register("ownerName", {
                    required: t('bookings.formValidation.required.businessCode'),
                })}
                error={errors.ownerName?.message}
            />

            <TextInput
                label={t("bookings.inputLabel.staffFullName")}
                autoComplete="organization"
                {...register("businessName", {
                    required: t("bookings.formValidation.required.staffFullName"),
                })}
                error={errors.businessName?.message}
            />

            <TextInput
                type="email"
                label={t('bookings.inputLabel.email')}
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

            <PhoneInput
                label={t('bookings.inputLabel.mobileNumber')}
                error={errors.phone?.message}
                {...register("phone", {
                    required: t('bookings.formValidation.required.mobileNumber'),
                    pattern: {
                        value: /^[0-9]{9,9}$/,
                        message: t('bookings.formValidation.mobileNumber'),
                    },
                })}
            />

            <PasswordInput
                label={t('bookings.inputLabel.password')}
                autoComplete="new-password"
                {...register("password", {
                    required: t('bookings.formValidation.required.password'),
                    minLength: {
                        value: 8,
                        message: t('bookings.formValidation.password'),
                    },
                })}
                error={errors.password?.message}
            />

            <PasswordInput
                label={t('bookings.inputLabel.confirmPassword')}
                autoComplete="new-password"
                {...register("confirmPassword", {
                    required: t('bookings.formValidation.required.password'),
                    minLength: {
                        value: 8,
                        message: t('bookings.formValidation.password'),
                    },
                    validate: (value) =>
                        value === password || t('bookings.formValidation.passwordNotMatch'),
                })}
                error={errors.confirmPassword?.message}
            />

            <TermsCheckbox
                {...register("acceptTerms", {
                    required: t('bookings.formValidation.required.businessTerms'),
                })}
                error={errors.acceptTerms?.message}
            />

            <PrimaryButton>
                { t('bookings.button.staffRegister') }
            </PrimaryButton>

            <Link to='/' className="form_sign-in-link border-t-3 w-full flex justify-center items-center gap-2.5 py-2">
                <span>{ t('bookings.link.loginQuestion') }</span>
                <span className="text-base font-medium text-button-color cursor-pointer">
                    { t('bookings.link.login') }
                </span>
            </Link>
        </form>
    );
};

export default StaffRegistration;
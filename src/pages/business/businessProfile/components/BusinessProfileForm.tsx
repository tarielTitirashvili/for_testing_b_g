import { Controller, type Control, type FieldErrors, type UseFormRegister, type UseFormSetValue }  from "react-hook-form"

import { ChevronDown, Facebook, Globe, Instagram, Music2 } from "lucide-react"

import { useTranslation } from "react-i18next"

import { useGetDistrictQuery, useGetRegionsQuery } from "@/redux/business/staticAPISlice/staticAPISlice"

import TextInput from "@/components/shared/inputs/TextInput"
import TextareaInput from "@/components/shared/inputs/TextareaInput"
import SelectDropDown from "@/components/shared/inputs/SelectDropDown"

import { useEffect, useState, type FunctionComponent } from "react"
import type { IBusinessAddress, IBusinessFormData } from "../BusinessProfile"
import SelectAddressMap from "./SelectAddressMap"
import Loader from '@/components/shared/loader'

interface IBusinessProfileFormProps {
    data: IBusinessFormData | undefined
    register: UseFormRegister<IBusinessFormData>
    errors: FieldErrors<IBusinessFormData>
    setValue: UseFormSetValue<IBusinessFormData>
    handleExpand: (section: string) => void
    control: Control<IBusinessFormData>
    regionId: number | null
    setRegionId: React.Dispatch<React.SetStateAction<number | null>>
}

const BusinessProfileForm: FunctionComponent<IBusinessProfileFormProps> = ({ register, errors, handleExpand, setValue, control, regionId, setRegionId, data }) => {

    const { t } = useTranslation()
    
    const forceUpdate = useState<number>(0)

    const { data: regions } = useGetRegionsQuery()
    const { data: district, isLoading, isSuccess: districtIdSuccess } = useGetDistrictQuery(regionId, {
        skip: regionId === null,
    })

    useEffect(()=>{
        if(districtIdSuccess && data?.district.id){
            setValue('regionId', data.district.id)
            setValue('region', data.district)
            forceUpdate[1](prev => prev+1)
        }
    },[districtIdSuccess])

    // for region dropdown list
    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Number(e.target.value)
        setRegionId(selected)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="business_profile_form-title text-lg font-semibold flex justify-between items-center">
                <div className="title">
                    { t("businessProfile.businessInfo.title") }
                </div>
                <div className="expand_btn flex sm:hidden" onClick={() => handleExpand('businessProfileForm')}>
                    <ChevronDown className={`transition-transform duration-300`} />
                </div>
            </div>
            <div className="business_profile_form-body flex flex-col flex-1 gap-3">
                <TextInput
                    label={ t("businessProfile.businessInfo.name") }
                    {...register('name', { required: 'Business Name is Required' })}
                    error={errors.name?.message}
                />

                <TextareaInput
                    label={ t("businessProfile.businessInfo.description") }
                    className="h-[95px]"
                    {...register('description', { required: 'Business Description is Required' })}
                    error={errors.description?.message}
                />

                <div className="business_profile_form-extra_info grid grid-cols-1 gap-3 justify-center lg:grid-cols-2">
                    <TextInput
                        label={t("bookings.inputLabel.webSite")}
                        InputIcon={Globe}
                        {...register('webSite', { required: 'Business Web-site is Required' })}
                        error={errors.webSite?.message}
                    />

                    <TextInput
                        label="TikTok"
                        InputIcon={Music2}
                        {...register('tikTok', { required: 'Business Tik-Tok is Required' })}
                        error={errors.tikTok?.message}
                    />

                    <TextInput
                        label="Instagram"
                        InputIcon={Instagram}
                        {...register('instagram', { required: 'Business Instagram is Required' })}
                        error={errors.instagram?.message}
                    />

                    <TextInput
                        label="Facebook"
                        InputIcon={Facebook}
                        {...register('facebook', { required: 'Business Facebook is Required' })}
                        error={errors.facebook?.message}
                    />
                </div>
            </div>
            <div className="business_profile_form-address flex flex-col gap-3 p-2 border-2 rounded-sm border-[#EBEBEB]">
                <Controller
                    name="regionId"
                    control={control}
                    render={({ field }) => (
                        <SelectDropDown
                            {...field}
                            label={t("bookings.inputLabel.address")}
                            options={regions ?? []}
                            sentId
                            onChange={(e) => {
                                const value = Number(e.target.value)
                                field.onChange(value)
                                handleRegionChange(e)
                            }}
                            error={errors.regionId?.message}
                        />
                    )}
                />
                <Loader loading={isLoading}>
                    <div className="address_select-row grid grid-cols-2 gap-2 justify-between">
                        <Controller
                            name="districtId"
                            control={control}
                            render={({ field }) => (
                                <SelectDropDown
                                    options={district ?? []}
                                    disabled={!regionId}
                                    error={errors.districtId?.message}
                                    value={field.value}
                                    sentId
                                    onChange={(e) => {
                                        const value = Number(e.target.value)
                                        field.onChange(value)
                                    }}
                                />
                            )}
                            />
                        <div className="pt-1.5">
                            <Controller
                                name="businessAddress"
                                control={control}
                                render={({ field }) => (
                                    <SelectAddressMap
                                    onSelect={(address: IBusinessAddress) => setValue("businessAddress", address)}
                                    error={errors.businessAddress?.message} 
                                    value={field.value}
                                    />
                                )}
                                />
                        </div>
                    </div>
                </Loader>
                <iframe src="http://maps.google.com/maps?q=25.3076008,51.4803216&z=16&output=embed" width={'100%'} height={'130px'} ></iframe>
            </div>
        </div>
    )
}

export default BusinessProfileForm
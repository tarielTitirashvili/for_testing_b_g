import { useEffect, useState, type FunctionComponent } from "react"

import { useForm } from "react-hook-form"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { MapPin, Pencil, Plus } from "lucide-react"

import { useCreateDistrictMutation, useEditDistrictMutation, useGetDistrictByIdQuery } from "@/redux/admin/region/regionAPISlice"

import type { IRegion } from "../../regions/Regions"

import { t } from "i18next"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import PrimaryPressable from "@/components/shared/buttons/PrimaryPressable"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"

import SelectDropDown from "@/components/shared/inputs/SelectDropDown"
import TextInput from "@/components/shared/inputs/TextInput"

export interface IAddDistrictFormData {
    regionId: number,
    locales: {
        name: string,
        languageId: number
    }[]
}

export interface IEditDistrictFormData {
    model: {
        districtId: number,
        regionId: number,
        locales: {
            name: string,
            languageId: number
        }[]
    }
}

interface IAddDistrictProps {
    districtId?: number
    regions: IRegion[]
}

const AddDistrict: FunctionComponent<IAddDistrictProps> = ({ districtId, regions }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IAddDistrictFormData>({
        defaultValues: {
            locales: [
                {
                    languageId: 1
                }
            ]
        }
    })

    const [openModal, setOpenModal] = useState<boolean>(false)

    const [createDistrict, { isLoading: isCreateDistrictLoading }] = useCreateDistrictMutation()
    const [editDistrict, { isLoading: isEditDistrictLoading }] = useEditDistrictMutation()

    const { data: districtData, isSuccess: isDistrictDataSuccess } = useGetDistrictByIdQuery(districtId, { skip: !districtId })


    const handleEdit = (data: IAddDistrictFormData) => {
        const payload: IEditDistrictFormData = {
            model: {
                districtId: districtId!,
                regionId: data.regionId,
                locales: data.locales.map(locale => ({
                    name: locale.name,
                    languageId: locale.languageId,
                }))
            }
        }
        
        editDistrict(payload)
    }

    const handleDistrict = (data: IAddDistrictFormData) => {
        if (districtId) {
            handleEdit(data)
        } else {
            createDistrict(data)
        }
        setOpenModal(false)
    }

    useEffect(() => {
        if (isDistrictDataSuccess && districtData) {
            const payload: IAddDistrictFormData = {
                regionId: districtData.regionId,
                locales: districtData.locales.map((locale) => ({
                    name: locale.name,
                    languageId: locale.languageId
                }))
            }

            reset(payload)
        }

    }, [isDistrictDataSuccess])

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            {districtId ? (
                <DialogTrigger asChild>
                    <Pencil size={20} className="cursor-pointer" />
                </DialogTrigger>
            ) : (
                <DialogTrigger asChild className="max-w-fit">
                    <PrimaryPressable>
                        <Plus /> { t('admin.addDistrict.title') }
                    </PrimaryPressable>
                </DialogTrigger>
            )}

            <DialogContent className="max-w-[500px] w-full">
                <DialogHeader>
                    <DialogTitle>{ !districtId ? t('admin.addDistrict.title') : t('admin.editDistrict.title') }</DialogTitle>
                    <DialogDescription>{ !districtId ? t('admin.addDistrict.description') : t('admin.editDistrict.description') }</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleDistrict)} className="flex flex-col gap-4">

                    <TextInput 
                        label={t('admin.district')}
                        InputIcon={MapPin}
                        {...register('locales.0.name', {
                            required: t('admin.district.required')
                        })}
                        error={errors.locales && errors.locales[0]?.name?.message}
                    />

                    <SelectDropDown
                        label={t('admin.region')}
                        options={regions.map(r => ({ id: r.id.toString(), name: r.name }))}
                        sentId
                        {...register('regionId', {
                            required: t('admin.region.required'),
                            valueAsNumber: true
                        })}
                        error={errors.regionId?.message}
                    />


                    <DialogFooter>
                        <DialogClose asChild>
                            <SecondaryButton>
                                { t('bookings.button.close') }
                            </SecondaryButton>
                        </DialogClose>
                        <PrimaryButton disabled={isCreateDistrictLoading || isEditDistrictLoading} loading={isCreateDistrictLoading || isEditDistrictLoading}>
                            { !districtId ? t('bookings.button.save') : t('bookings.button.edit') }
                        </PrimaryButton>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default AddDistrict
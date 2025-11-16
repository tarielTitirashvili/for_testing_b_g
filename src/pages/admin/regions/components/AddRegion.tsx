import { useEffect, useState, type FunctionComponent } from "react"

import { useForm } from "react-hook-form"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { useAddRegionMutation, useEditRegionMutation, useGetRegionByIdQuery } from "@/redux/admin/region/regionAPISlice"

import { Globe2, Pencil, Plus } from "lucide-react"

import { t } from "i18next"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import PrimaryPressable from "@/components/shared/buttons/PrimaryPressable"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"

import TextInput from "@/components/shared/inputs/TextInput"

interface IRegionLocales {
    name: string
    languageId: number
}

export interface IAddRegionFormData {
    locales: IRegionLocales[]
}

export interface IEditRegionFormData {
    model: {
        regionId: number,
        locales: IRegionLocales[]
    }
}

interface IAddRegionProps {
    regionId?: number
}

const AddRegion: FunctionComponent<IAddRegionProps> = ({ regionId }) => {

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const { handleSubmit, register, reset, formState: { errors } } = useForm<IAddRegionFormData>({
        defaultValues: {
            locales: [
                {
                    languageId: 1
                }
            ]
        }
    })

    const { data: regionData, isSuccess: isRegionDataSuccess } = useGetRegionByIdQuery(regionId, { skip: !modalOpen || !regionId })
    
    const [addRegion, { isLoading: isAddRegionLoading }] = useAddRegionMutation()
    const [editRegion, { isLoading: isEditRegionLoading }] = useEditRegionMutation()

    const handleAddRegion = (data: IAddRegionFormData) => {
        addRegion(data)
        reset()
    }

    const handleEditRegion = (data: IAddRegionFormData) => {
        const payload: IEditRegionFormData = {
            model: {
                regionId: regionId!,
                locales: [...data.locales],
            }
        }
        editRegion(payload)
    }
    
    const handleRegion = (data: IAddRegionFormData) => {
        if (regionId) {
            handleEditRegion(data)
        } else {
            handleAddRegion(data)
        }
        setModalOpen(false)
    }


    useEffect(() => {
        if (isRegionDataSuccess && regionData) {
            const payload: IAddRegionFormData = {
                locales: regionData.locales.map((locale) => ({
                    name: locale.name,
                    languageId: locale.languageId
                }))
            };
            reset(payload);
        }
    }, [isRegionDataSuccess, regionData, reset]);


    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                {regionId ? (
                    <DialogTrigger asChild>
                        <Pencil size={20} className="cursor-pointer" />
                    </DialogTrigger>
                ) : (
                    <DialogTrigger asChild className="max-w-fit">
                        <PrimaryPressable>
                            <Plus /> {t('admin.addRegion.title')}
                        </PrimaryPressable>
                    </DialogTrigger>
                )}
            <DialogContent className="max-w-[500px] w-full">
                <DialogHeader>
                    <DialogTitle>{ !regionId ? t('admin.addRegion.title') : t('admin.editRegion.title') }</DialogTitle>
                    <DialogDescription>{ !regionId ? t('admin.addRegion.description') : t('admin.editRegion.description') }</DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleRegion)}>
                    <TextInput 
                        InputIcon={Globe2}
                        label={t('admin.region')}
                        {...register('locales.0.name', {
                            required: t('admin.region.required')
                        })}
                        error={errors.locales && errors.locales[0]?.name?.message}
                    />
                    
                    <DialogFooter>
                        <DialogClose asChild>
                            <SecondaryButton>Close</SecondaryButton>
                        </DialogClose>
                        <PrimaryButton disabled={isAddRegionLoading || isEditRegionLoading} loading={isAddRegionLoading || isEditRegionLoading}>
                            { !regionId ? t('bookings.button.save') : t('bookings.button.edit') }
                        </PrimaryButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddRegion
import { useEffect, useState, type FunctionComponent } from "react"

import { useForm } from "react-hook-form"

import { useCreateBusinessCategoryMutation, useEditBusinessCategoryMutation, useGetBusinessCategoryByIdQuery } from "@/redux/admin/businessCategory/businessCategoryAPISlice"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Pencil, Plus } from "lucide-react"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import PrimaryPressable from "@/components/shared/buttons/PrimaryPressable"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"

import SelectDropDown from "@/components/shared/inputs/SelectDropDown"
import TextInput from "@/components/shared/inputs/TextInput"
import { t } from "i18next"

export interface IAddBusinessCategoryFormData {
    businessCategoryTypeId: number
    locales: {
        name: string
        languageId: number
    }[]
}

export interface IEditBusinessCategoryFormData {
    model: {
        id: number
        businessCategoryTypeId: number
        locales: {
            name: string,
            languageId: number
        }[]
    }
}

interface IBusinessCategoryList {
    id: number,
    name: string
}

interface IAddBusinessCategoryProps {
    businessCategoryId?: number
}

const businessCategoryTypes: IBusinessCategoryList[] = [
    {
        id: 1,
        name: 'Object'
    },
    {
        id: 2,
        name: 'Service'
    },
    
]

const AddBusinessCategory: FunctionComponent<IAddBusinessCategoryProps> = ({ businessCategoryId }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IAddBusinessCategoryFormData>({
        defaultValues: {
            locales: [
                { languageId: 1}
            ]
        }
    })

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const { 
        data: businessCategoryData,
        isSuccess: isBusinessCategorySuccess
    } = useGetBusinessCategoryByIdQuery(businessCategoryId, { skip: !businessCategoryId })

    const [createBusinessCategory] = useCreateBusinessCategoryMutation()
    const [editBusinessCategory] = useEditBusinessCategoryMutation()

    const handleBusinessCategoryCreate = (data: IAddBusinessCategoryFormData) => {
        createBusinessCategory(data)
    }

    const handleBusinessCategoryEdit = (data: IAddBusinessCategoryFormData) => {
        const payload: IEditBusinessCategoryFormData = {
            model: {
                id: businessCategoryId!,
                businessCategoryTypeId: data.businessCategoryTypeId,
                locales: data.locales.map(locale => ({
                    name: locale.name,
                    languageId: locale.languageId
                }))
            }
        }
        editBusinessCategory(payload)
    }

    const handleBusinessCategory = (data: IAddBusinessCategoryFormData) => {
        if (!businessCategoryId) {
            handleBusinessCategoryCreate(data)
        } else {
            handleBusinessCategoryEdit(data)
        }
        setModalOpen(false)
    }

    useEffect(() => {
        if (isBusinessCategorySuccess && businessCategoryData) {
            reset(businessCategoryData)
        }
    }, [isBusinessCategorySuccess])

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            {businessCategoryId ? (
                <DialogTrigger asChild>
                    <Pencil size={20} className="cursor-pointer" />
                </DialogTrigger>
            ) : (
                <DialogTrigger asChild className="max-w-fit">
                    <PrimaryPressable>
                        <Plus /> { t('categories.addCategory.modal.title') }
                    </PrimaryPressable>
                </DialogTrigger>
            )}
            
            <DialogContent className="max-w-[500px] w-full">
                <DialogHeader>
                    {!businessCategoryId ? (
                        <>
                            <DialogTitle>{t('businessCategory.add.title')}</DialogTitle>
                            <DialogDescription>{t('businessCategory.add.description')}</DialogDescription>
                        </>
                    ): (
                        <>
                            <DialogTitle>{t('businessCategory.edit.title')}</DialogTitle>
                            <DialogDescription>{t('businessCategory.edit.description')}</DialogDescription>
                        </>
                    )}
                </DialogHeader>

                <form onSubmit={handleSubmit(handleBusinessCategory)} className="flex flex-col gap-4">

                    <TextInput 
                        label={t("businessCategory.add.categoryName")}
                        placeholder="Business Category"
                        {...register('locales.0.name', {
                            required: t('businessCategory.add.categoryName.required')
                        })}
                        error={errors.locales && errors.locales[0]?.name?.message}
                    />
                    
                    <SelectDropDown
                        label={t('businessCategory.add.categoryType')}
                        options={businessCategoryTypes}
                        sentId
                        {...register('businessCategoryTypeId', {
                            required: t('businessCategory.add.categoryType.required'),
                            valueAsNumber: true
                        })}
                        error={errors.businessCategoryTypeId && errors.businessCategoryTypeId.message}
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <SecondaryButton type="button">{ t('bookings.button.close') }</SecondaryButton>
                        </DialogClose>
                        <PrimaryButton type="submit">
                            { !businessCategoryId ? t('bookings.button.save') : t('bookings.button.edit') }
                        </PrimaryButton>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default AddBusinessCategory

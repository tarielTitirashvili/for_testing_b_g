import { useEffect, type FunctionComponent } from "react"

import { useForm } from "react-hook-form"

import { useCreateBusinessCategoryMutation, useEditBusinessCategoryMutation, useGetBusinessCategoryByIdQuery } from "@/redux/admin/businessCategory/businessCategoryAPISlice"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Pencil, Plus } from "lucide-react"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import PrimaryPressable from "@/components/shared/buttons/PrimaryPressable"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"

import SelectDropDown from "@/components/shared/inputs/SelectDropDown"
import TextInput from "@/components/shared/inputs/TextInput"

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
        
    }

    useEffect(() => {
        if (isBusinessCategorySuccess && businessCategoryData) {
            reset(businessCategoryData)
        }
    }, [isBusinessCategorySuccess])

    return (
        <Dialog>
            {businessCategoryId ? (
                <DialogTrigger asChild>
                    <Pencil size={20} className="cursor-pointer" />
                </DialogTrigger>
            ) : (
                <DialogTrigger asChild className="max-w-fit">
                    <PrimaryPressable>
                        <Plus /> Add Category
                    </PrimaryPressable>
                </DialogTrigger>
            )}
            
            <DialogContent className="max-w-[500px] w-full">
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>Manage category</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleBusinessCategory)} className="flex flex-col gap-4">

                    <TextInput 
                        label="Category Name"
                        placeholder="Business Category"
                        {...register('locales.0.name', {
                            required: "Business Category name is required"
                        })}
                        error={errors.locales && errors.locales[0]?.name?.message}
                    />
                    
                    <SelectDropDown
                        options={businessCategoryTypes}
                        sentId
                        {...register('businessCategoryTypeId', {
                            required: "Business Category type is required",
                            valueAsNumber: true
                        })}
                        error={errors.businessCategoryTypeId && errors.businessCategoryTypeId.message}
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <SecondaryButton>Close</SecondaryButton>
                        </DialogClose>
                        <PrimaryButton>
                            Add
                        </PrimaryButton>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default AddBusinessCategory

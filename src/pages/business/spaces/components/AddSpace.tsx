import { useEffect, type FunctionComponent } from "react"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"

import { useCreateSpaceMutation, useEditSpaceMutation, useGetSpaceByIdQuery, type ISpaceResponse } from "@/redux/business/space/spaceAPISlice"

import type { ISpace } from "../Spaces"

import TextInput from "@/components/shared/inputs/TextInput"
import SelectDropDown from "@/components/shared/inputs/SelectDropDown"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import PrimaryButton from "@/components/shared/buttons/PrimaryButton"

export interface IAddSpaceFormData {
    tableCategoryId: number,
    tableNumber: string,
    capacity: number,
    isAvailable: boolean,
    isActive: boolean,
    locales: {
        name: string,
        languageId: number,
        description: string
    }[]
    
}

export interface IEditSpace extends Omit<IAddSpaceFormData, "tableCategoryId"> {
    serviceId: number | undefined
}

interface ICategory {
    isSystem: boolean,
    id: string
    name: string
}

interface IAddSpace {
    categories: ICategory[]
    space?: ISpace
    triggerText?: string
    categoryId?: string
    icon?: boolean
    spaceId?: number
}

const AddSpace: FunctionComponent<IAddSpace> = ({ categories, triggerText, categoryId, spaceId}) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IAddSpaceFormData>()

    // console.log(categoryId)

    const { data: spaceDataById, isSuccess: spaceByIdSuccess } = useGetSpaceByIdQuery(spaceId, {
        skip: spaceId === undefined
    })
    const [editSpaceService] = useEditSpaceMutation()
    const [createdSpaceService] = useCreateSpaceMutation()

    const handleSpaceServiceEdit = (data: IAddSpaceFormData) => {
        const payload: IEditSpace = {
            serviceId: spaceId,
            tableNumber: data.tableNumber,
            capacity: data.capacity,
            isActive: data.isActive,
            isAvailable: data.isAvailable,
            locales: [{
                name: data.locales[0].name,
                description: data.locales[0].description,
                languageId: data.locales[0].languageId
            }]

        }

        console.log(JSON.stringify(payload, null, 2))
        editSpaceService(payload)
    }

    const handleSpaceServiceCreate = (data: IAddSpaceFormData) => {

        const payload: IAddSpaceFormData = {
            tableCategoryId: +data.tableCategoryId,
            tableNumber: '1',
            capacity: data.capacity,
            isActive: true,
            isAvailable: true,
            locales: [{
                name: data.locales[0].name,
                description: 'desc',
                languageId: 1
            }]
        }

        console.log(JSON.stringify(payload, null, 2))
        createdSpaceService(payload)
    }

    const handleSpace = (data: IAddSpaceFormData) => {
        if (spaceId) {
            handleSpaceServiceEdit(data)
        } else {
            handleSpaceServiceCreate(data)
        }
    }

    useEffect(() => {
        if (spaceByIdSuccess && spaceDataById) {
            const formatted: ISpaceResponse = {
                ...spaceDataById,
                categoryId: +categoryId!
            }

            reset(formatted)
        }
    }, [spaceByIdSuccess])

    return (
        <Dialog>
            <DialogTrigger className="flex text-sm cursor-pointer w-full">
                {triggerText}
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full flex flex-col gap-6">
                <DialogHeader>
                    <DialogTitle>ადგილის დამატება</DialogTitle>
                    <DialogDescription>მართე ადგილები მარტივად</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSpace)} className="dialog_body flex flex-col gap-6">
                    <TextInput
                        label="სახელი"
                        {...register('locales.0.name', { required: "Table name is required" })}
                        error={errors.locales?.[0]?.name?.message}
                    />
                    <TextInput
                        type="number"
                        label="სტუმრების რაოდენობა"
                        {...register('capacity', { required: 'Amount of guests is required', valueAsNumber: true  })}
                        error={errors.capacity?.message}
                    />
                    <SelectDropDown
                        label="კატეგორია"
                        sentId
                        options={categories ?? []}
                        {...register('tableCategoryId', { required: 'Category is required' })}
                        error={errors.tableCategoryId?.message}
                    />
                    <DialogFooter className="flex">
                        <DialogClose asChild className="flex-1">
                            <SecondaryButton>გაუქმება</SecondaryButton>
                        </DialogClose>
                        <PrimaryButton className="flex-1">დამატება</PrimaryButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddSpace
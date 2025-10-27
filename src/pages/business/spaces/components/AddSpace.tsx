import { useEffect, useState, type FunctionComponent } from "react"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"

import { useCreateSpaceMutation, useEditSpaceMutation, useGetSpaceByIdQuery, type ISpaceResponse } from "@/redux/business/space/spaceAPISlice"

import type { ISpace } from "../Spaces"

import TextInput from "@/components/shared/inputs/TextInput"
import SelectDropDown from "@/components/shared/inputs/SelectDropDown"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import { Pen } from "lucide-react"

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

const AddSpace: FunctionComponent<IAddSpace> = ({ categories, triggerText, categoryId, spaceId, icon }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IAddSpaceFormData>()

    const [modalOpen, setModalOpen] = useState<boolean>(false)

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
            tableNumber: data.tableNumber || data.capacity.toString(),
            capacity: data.capacity,
            isActive: data.isActive || true,
            isAvailable: data.isAvailable || true,
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

        reset()
        setModalOpen(false)
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
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger
                className="cursor-pointer hover:bg-[#F5F5F5] w-full focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
                {icon && <Pen />}{triggerText}
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full flex flex-col gap-6 pointer-event-none">
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

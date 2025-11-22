import { useEffect, useState, type FunctionComponent } from "react"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"

import { spaceApiSlice, useCreateSpaceMutation, useEditSpaceMutation, useGetSpaceByIdQuery, type ISpaceResponse } from "@/redux/business/space/spaceAPISlice"

import type { ISpace } from "../Spaces"

import TextInput from "@/components/shared/inputs/TextInput"
import SelectDropDown from "@/components/shared/inputs/SelectDropDown"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import { Pen } from "lucide-react"
import { t } from "i18next"
import { useDispatch } from 'react-redux'
import createToast from '@/lib/createToast'

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

    const dispatch = useDispatch()

    const [editSpaceService, {isSuccess: isSpaceEditSuccess, isLoading: isSpaceEditLoading}] = useEditSpaceMutation()
    const [createdSpaceService, {isSuccess: isSpaceCreationSuccess, isLoading: isSpaceCreationLoading}] = useCreateSpaceMutation()

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

    useEffect(()=>{
        if(isSpaceEditSuccess)
            createToast.success(t('business.successMessage.infoWasSuccessFullyUpdated'))
        if(isSpaceCreationSuccess)
            createToast.success(t('business.successMessage.spaceWasSuccessFullyAdded'))
        if(isSpaceCreationSuccess || isSpaceEditSuccess)
            dispatch(spaceApiSlice.util.invalidateTags(["Space"]))
    },[isSpaceEditSuccess, isSpaceCreationSuccess, dispatch])

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger
                className="cursor-pointer hover:bg-[#F5F5F5] w-full focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
                {icon && <Pen />}{triggerText}
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full flex flex-col gap-6 pointer-event-none">
                <DialogHeader>
                    <DialogTitle>
                        {spaceId ? t('space.addSpace.modal.title.edit') : t('space.addSpace.modal.title')}
                    </DialogTitle>
                    <DialogDescription>
                        {spaceId ? t('space.addSpace.modal.description.edit') : t('space.addSpace.modal.description')}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSpace)} className="dialog_body flex flex-col gap-6">
                    <TextInput
                        label={t('space.addSpace.name')}
                        {...register('locales.0.name', { required: t('space.addSpace.required.name') })}
                        error={errors.locales?.[0]?.name?.message}
                        />
                    <TextInput
                        type="number"
                        label={t('space.addSpace.guestCount')}
                        {...register('capacity', { required: t('space.addSpace.required.guestCount'), valueAsNumber: true  })}
                        error={errors.capacity?.message}
                    />
                    <SelectDropDown
                        label={t('bookings.button.category')}
                        sentId
                        options={categories ?? []}
                        {...register('tableCategoryId', { required: t('bookings.button.required.category') })}
                        error={errors.tableCategoryId?.message}
                    />
                    <DialogFooter className="flex">
                        <DialogClose asChild className="flex-1">
                            <SecondaryButton>{ t('bookings.button.close') }</SecondaryButton>
                        </DialogClose>
                        <PrimaryButton loading={isSpaceEditLoading || isSpaceCreationLoading} className="flex-1">
                            {spaceId ? t('bookings.button.edit') : t('bookings.button.save')}
                        </PrimaryButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddSpace

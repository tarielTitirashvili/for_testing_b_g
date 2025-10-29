import { useEffect, useState, type FunctionComponent } from "react"

import { useForm } from "react-hook-form"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog"


import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import TextInput from "@/components/shared/inputs/TextInput"

import { PencilIcon } from "lucide-react"
import { useCreateCategoryMutation, useEditCategoryMutation, useGetCategoryByIdQuery } from "@/redux/business/category/categoryAPISlice"

import type { IEditCategory } from "@/pages/business/services/Services"
import { t } from "i18next"


export interface IAddCategoryFormData {
    categoryId: number,
    isSystem: boolean,
    categoryLocales: {
        languageId: number,
        name: string
    }[]
}

interface IAddCategoryProps {
    initialValue?: string
    categoryId?: string
    icon?: boolean
    triggerText?: string
}

const AddCategory: FunctionComponent<IAddCategoryProps> = ({ categoryId, icon, triggerText }) => {

    const { register, formState: { errors }, reset, handleSubmit } = useForm<IAddCategoryFormData>()

    const { data: categoryData, isSuccess: categorySuccess } = useGetCategoryByIdQuery(categoryId ? +categoryId : undefined, {
        skip: categoryId === undefined
    })

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    
    const [createCategory] = useCreateCategoryMutation()
    const [editCategory] = useEditCategoryMutation()

    const handleEditCategory = (data: IAddCategoryFormData) => {
        const payload: IEditCategory = {
            categoryId: +categoryId!,
            categoryLocales: [
                {
                    name: data.categoryLocales[0].name,
                    languageId: data.categoryLocales[0].languageId || 1,
                },
            ],
        }

        editCategory(payload)
        console.log(payload)
    }

    const handleCreateCategory = (data: IAddCategoryFormData) => {
        const payload = {
            languageId: data.categoryLocales[0].languageId || 1,
            name: data.categoryLocales[0].name
        }

        createCategory([payload])
        console.log(payload)
    }

    const handleCategory = (data: IAddCategoryFormData) => {
        if (categoryId) {
            handleEditCategory(data)
        } else {
            handleCreateCategory(data)
        }

        setModalOpen(false)
        reset()
    }

    useEffect(() => {
        if (categorySuccess && categoryData) {
            const formattedData: IAddCategoryFormData = {
                categoryId: +categoryId!,
                ...categoryData,
                categoryLocales: [
                    {
                        languageId: categoryData.locales[0].languageId,
                        name: categoryData.locales[0].name
                    }
                ]
            }

            reset(formattedData)
        }
    }, [categorySuccess])

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild={icon}>
                { icon ? (
                    <p><PencilIcon size={20} cursor='pointer' /></p>
                ) : (
                    <span
                        className="cursor-pointer hover:bg-[#F5F5F5] w-full focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    >
                        {triggerText}
                    </span>
                ) }
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full flex flex-col gap-6">
                <DialogHeader>
                    <DialogTitle>
                        {categoryId ? t('categories.addCategory.modal.title.edit') : t('categories.addCategory.modal.title')}
                    </DialogTitle>
                    <DialogDescription>
                        {categoryId ? t('categories.addCategory.modal.description.edit') : t('categories.addCategory.modal.description')}
                    </DialogDescription>
                </DialogHeader>
                    <form
                        onSubmit={handleSubmit(handleCategory)}
                        className="flex flex-col gap-6"
                    >
                        <TextInput
                            label="კატეგორია"
                            placeholder={t('categories.addCategory.placeholder')}
                            {...register('categoryLocales.0.name', { required: t('bookings.button.required.category') })}
                            error={errors.categoryLocales?.[0]?.name?.message}
                        />

                        <DialogFooter className="flex">
                            <DialogClose className="flex-1 w-full border-[#BEBEBE] border-2 rounded-md py-2 cursor-pointer">
                                {t('bookings.button.close')}
                            </DialogClose>
                                <PrimaryButton className="flex-1">
                                    { categoryId ? t('bookings.button.edit') : t('bookings.button.save') }
                                </PrimaryButton>
                        </DialogFooter>
                    </form>

            </DialogContent>
        </Dialog>
    )
}

export default AddCategory
import { useEffect, type FunctionComponent } from "react"

import { useForm } from "react-hook-form"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog"


import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import TextInput from "@/components/shared/inputs/TextInput"

import { PencilIcon } from "lucide-react"
import { useCreateCategoryMutation, useEditCategoryMutation, useGetCategoryByIdQuery } from "@/redux/business/category/categoryAPISlice"
import type { IEditCategory } from "@/pages/business/services/Services"


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
        <Dialog>
            <DialogTrigger className="w-full text-left cursor-pointer">
                { icon && <PencilIcon size={20} /> } { triggerText }
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full flex flex-col gap-6">
                <DialogHeader>
                    <DialogTitle>
                        Add a Category
                    </DialogTitle>
                    <DialogDescription>
                        Add a New Category
                    </DialogDescription>
                </DialogHeader>
                    <form
                        onSubmit={handleSubmit(handleCategory)}
                        className="flex flex-col gap-6"
                    >
                        <TextInput
                            label="კატეგორია"
                            placeholder="ჩაწერე კატეგორიის დასახელება"
                            {...register('categoryLocales.0.name', { required: "კატეგორიის სახელი აუცილებელია" })}
                            error={errors.categoryLocales?.[0]?.name?.message}
                        />

                        <DialogFooter className="flex">
                            <DialogClose className="flex-1 w-full border-[#BEBEBE] border-2 rounded-md py-2 cursor-pointer">
                                Close
                            </DialogClose>
                            <PrimaryButton className="flex-1">
                                { categoryId ? 'Save' : 'Create' }
                            </PrimaryButton>
                        </DialogFooter>
                    </form>

            </DialogContent>
        </Dialog>
    )
}

export default AddCategory
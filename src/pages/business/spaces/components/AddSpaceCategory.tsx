import type { FunctionComponent } from "react"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"

import { useForm, type SubmitHandler } from "react-hook-form"

import SelectDropDown from "@/components/shared/inputs/SelectDropDown"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import PrimaryButton from "@/components/shared/buttons/PrimaryButton"

interface IAddCategoryFormData {
    languageId: number,
    name: string

}

interface IAddSpaceCategoryProps {
    categoryId?: string
    icon?: boolean
    triggerText?: string
}

const AddSpaceCategory: FunctionComponent<IAddSpaceCategoryProps> = ({ icon, triggerText, categoryId }) => {

    const { handleSubmit, register, formState: { errors } } = useForm<IAddCategoryFormData>({
        defaultValues: {
            languageId: 1
        }
    })

    const handleSpaceCategory: SubmitHandler<IAddCategoryFormData> = async (data: IAddCategoryFormData) => {
        console.log(data)    
    }

    return (
        <Dialog>
            <DialogTrigger className="w-full text-left cursor-pointer text-sm font-medium">
                { icon && <Pencil /> } { triggerText && triggerText }
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full flex flex-col gap-6">
                <DialogHeader>  
                    <p>{categoryId}</p>
                    <DialogTitle>
                        კატეგორიის დამატება
                    </DialogTitle>
                    <DialogDescription>
                        მართე კატეგორიები მარტივად
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSpaceCategory)} className="dialog_body flex flex-col gap-6">
                    <SelectDropDown
                        label="კატეგორია"
                        sentId={false}
                        options={[
                            { id: '1', name: 'შიგნით' },
                            { id: '2', name: 'გარეთ' },
                        ]}
                        {...register('name', {required: "Category is required"})}
                        error={errors.name?.message}
                    />
                    <DialogFooter className="flex">
                        <DialogClose className="flex-1">
                            <SecondaryButton>გაუქმება</SecondaryButton>
                        </DialogClose>
                        <PrimaryButton className="flex-1">დამატება</PrimaryButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddSpaceCategory

import { useEffect, useState, type FunctionComponent } from "react"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"

import { useForm, type SubmitHandler } from "react-hook-form"

import SelectDropDown from "@/components/shared/inputs/SelectDropDown"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import { useCreateTableCategoryMutation } from "@/redux/business/category/categoryAPISlice"
import { t } from "i18next"
import createToast from '@/lib/createToast'

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

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const [createTableCategory, {isLoading, isSuccess}] = useCreateTableCategoryMutation()
    // const { data: categoryData, isSuccess: isCategorySuccess } = useGetTableCategoryByIdQuery(+categoryId!, { skip: !categoryId })


    const handleSpaceCategory: SubmitHandler<IAddCategoryFormData> = async (data: IAddCategoryFormData) => {
        createTableCategory([data])
        setModalOpen(false)
    }

    // No edit yet
    // useEffect(() => {
    //     if (isCategorySuccess && categoryData) {
    //         const formatted: IAddCategoryFormData = {
    //             ...categoryData,
    //             name: categoryData.categoryLocales[0].name,
    //             languageId: categoryData.categoryLocales[0].languageId
    //         }
            
    //         reset(formatted)
    //     }
    // }, [])

    useEffect(()=>{
        if(isSuccess){
            createToast.success(t('business.successMessage.categoryWasSuccessFullyAdded'))
        }
    },[isSuccess])
    
    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger
                className="cursor-pointer hover:bg-[#F5F5F5] w-full focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
                { icon && <Pencil /> } { triggerText && triggerText }
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full flex flex-col gap-6">
                <DialogHeader>  
                    <p>{categoryId}</p>
                    <DialogTitle>
                        {t('service.header.addButton')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('categories.manageCategories.text')}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSpaceCategory)} className="dialog_body flex flex-col gap-6">
                    <SelectDropDown
                        label={t('bookings.button.category')}
                        sentId={false}
                        options={[
                            { id: '1', name: t('business.businessTexts.inside') },
                            { id: '2', name: t('business.businessTexts.outside') },
                        ]}
                        {...register('name', { required: t('bookings.button.required.category') })}
                        error={errors.name?.message}
                    />
                    <DialogFooter className="flex">
                        <DialogClose asChild className="flex-1">
                            <SecondaryButton>{t('bookings.actionButtons.cancel')}</SecondaryButton>
                        </DialogClose>
                        <PrimaryButton loading={isLoading} className="flex-1">{t('bookings.button.add')}</PrimaryButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddSpaceCategory
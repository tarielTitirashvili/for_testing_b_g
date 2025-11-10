import { useEffect, useState, type FunctionComponent } from "react"

import { Controller, useForm } from "react-hook-form"

import { t } from "i18next"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Checkbox } from "@/components/ui/checkbox"

import { Label } from "@/components/ui/label"

import { useAddLanguageMutation, useEditLanguageMutation, useGetLanguageByIdQuery } from "@/redux/admin/language/languageAPISlice"

import { Pencil, Plus } from "lucide-react"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import PrimaryPressable from "@/components/shared/buttons/PrimaryPressable"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import TextInput from "@/components/shared/inputs/TextInput"

export interface IAddLanguageFormData {
    name: string,
    abbreviature: string,
    languageCode: string,
    isRequired: boolean
}

export interface IEditLanguageFormData extends IAddLanguageFormData {
    id: number
}

interface IAddLanguageProps {
    languageId?: number
}

const AddLanguage: FunctionComponent<IAddLanguageProps> = ({ languageId }) => {

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IAddLanguageFormData | IEditLanguageFormData>()

    const {
        data: languageData,
        isSuccess: isLanguageSuccess,
    } = useGetLanguageByIdQuery(languageId, { skip: !languageId })

    const [addLanguage] = useAddLanguageMutation()
    const [editLanguage] = useEditLanguageMutation()

    const handelLanguages = (data: IAddLanguageFormData | IEditLanguageFormData) => {
        if (!languageId) {
            addLanguage(data as IAddLanguageFormData)
        } else {
            editLanguage(data as IEditLanguageFormData)
        }
        setModalOpen(false)
    }

    useEffect(() => {
        if (isLanguageSuccess && languageData) {
            reset(languageData)
        }
    }, [isLanguageSuccess])

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            {languageId ? (
                <DialogTrigger asChild>
                    <Pencil size={20} className="cursor-pointer" />
                </DialogTrigger>
            ) : (
                <DialogTrigger asChild className="max-w-fit">
                    <PrimaryPressable>
                        <Plus /> {t('admin.language.addLanguage.button')}
                    </PrimaryPressable>
                </DialogTrigger>
            )}
            <DialogContent className="max-w-[500px] w-full">
                <DialogHeader>
                    {!languageId ? (
                        <>
                            <DialogTitle>{t('admin.language.addLanguage.title')}</DialogTitle>
                            <DialogDescription>{t('admin.language.addLanguage.description')}</DialogDescription>
                        </>
                    ) : (
                        <>
                            <DialogTitle>{t('admin.language.addLanguage.title.edit')}</DialogTitle>
                            <DialogDescription>{t('admin.language.addLanguage.description.edit')}</DialogDescription>
                        </>
                    )}
                </DialogHeader>

                <form onSubmit={handleSubmit(handelLanguages)} className="flex flex-col gap-4">
                    <TextInput
                        label={t('admin.language.addLanguage.input.languageName')}
                        {...register('name', {
                            required: "Language Name is required"
                        })}
                        error={errors.name?.message}
                    />

                    <TextInput
                        label={t('admin.language.addLanguage.input.languageAbbreviation')}
                        {...register('abbreviature', {
                            required: "Abbreviation is required"
                        })}
                        error={errors.abbreviature?.message}
                    />
                    
                    <TextInput
                        label={t('admin.language.addLanguage.input.languageCode')}
                        {...register('languageCode', {
                            required: "Language Code is required"
                        })}
                        error={errors.languageCode?.message}
                    />

                    <Controller
                        control={control}
                        name="isRequired"
                        defaultValue={false}
                        render={({ field }) => (
                            <div className="flex gap-1.5 items-center">
                                <Checkbox
                                    id="radioReq"
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                                />
                                <Label htmlFor="radioReq">{`${t('admin.language.addLanguage.input.isRequired')}?`}</Label>
                            </div>
                        )}
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <SecondaryButton type="button">{t('bookings.button.close')}</SecondaryButton>
                        </DialogClose>
                        <PrimaryButton type="submit">
                            {!languageId ? t('bookings.button.save') : t('bookings.button.edit')}
                        </PrimaryButton>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default AddLanguage
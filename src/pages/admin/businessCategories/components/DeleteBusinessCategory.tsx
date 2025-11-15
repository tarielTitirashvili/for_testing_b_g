import type { FunctionComponent } from "react"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Trash2 } from "lucide-react"

import { t } from "i18next"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"

interface IDeleteBusinessCategoryProps {
    businessCategoryName: string,
    businessCategoryId: number,
    deleteBusinessCategory: (businessCategoryId: { id: number }) => void
}

const DeleteBusinessCategory: FunctionComponent<IDeleteBusinessCategoryProps> = ({ deleteBusinessCategory, businessCategoryId, businessCategoryName }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Trash2 className="cursor-pointer" color="red" size={22}  />
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full px-6 py-8 flex flex-col gap-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold flex justify-center text-red-700">
                        { t('businessCategory.modal.deleteCategory.title') }!
                    </DialogTitle>
                    <DialogDescription className="hidden" />
                </DialogHeader>

                <div className="text-center">
                    { t("businessCategory.modal.deleteCategory.text", {
                        businessCategory: `"${businessCategoryName}"`
                    }) }
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <SecondaryButton>{ t("bookings.button.close") }</SecondaryButton>
                    </DialogClose>
                    <DialogClose asChild>
                        <PrimaryButton
                            type="submit"
                            className="bg-red-500"
                            handleClick={() => deleteBusinessCategory({ id: businessCategoryId })}
                        >
                            { t("bookings.actionButtons.delete") }
                        </PrimaryButton>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteBusinessCategory
import type { FunctionComponent } from "react"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Trash2 } from "lucide-react"

import { t } from "i18next"

import SecondaryButton from "../buttons/SecondaryButton"
import PrimaryButton from "../buttons/PrimaryButton"

interface IDeleteConfirmationModal {
    itemId: number,
    handleDeleteItem: (itemId: number) => void
    modalTitle: string
    modalDescription: string
}

const DeleteConfirmationModal: FunctionComponent<IDeleteConfirmationModal> = ({ itemId, handleDeleteItem, modalTitle, modalDescription }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Trash2 className="cursor-pointer" color="red" size={22} />
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full px-6 py-8 flex flex-col gap-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold flex justify-center text-red-700">
                        { modalTitle }
                    </DialogTitle>
                    <DialogDescription className="hidden" />
                </DialogHeader>

                <div className="text-center">
                    { modalDescription }
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <SecondaryButton>{ t("bookings.button.close") }</SecondaryButton>
                    </DialogClose>
                    <DialogClose asChild>
                        <PrimaryButton
                            type="submit"
                            className="bg-red-500"
                            handleClick={() => handleDeleteItem(itemId)}
                        >
                            { t("bookings.actionButtons.delete") }
                        </PrimaryButton>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteConfirmationModal
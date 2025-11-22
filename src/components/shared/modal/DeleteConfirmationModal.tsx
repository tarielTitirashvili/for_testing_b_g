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
    dropdownItem?: boolean
    isDeleteProgress?: boolean
}

const DeleteConfirmationModal: FunctionComponent<IDeleteConfirmationModal> = ({ itemId, handleDeleteItem, modalTitle, modalDescription, dropdownItem, isDeleteProgress }) => {
    return (
        <Dialog>
            { dropdownItem ? (
                <DialogTrigger className="cursor-pointer text-red-500 hover:bg-[#F5F5F5] w-full focus:bg-accent data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                    <Trash2 color="red" /> { t('bookings.actionButtons.delete') }
                </DialogTrigger>
            ): (
                <DialogTrigger>
                    <Trash2 className="cursor-pointer" color="red" size={22} />
                </DialogTrigger>
            ) }
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
                            loading={isDeleteProgress}
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
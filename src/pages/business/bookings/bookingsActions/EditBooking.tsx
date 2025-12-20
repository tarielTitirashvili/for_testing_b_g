import type { FunctionComponent } from "react"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import SelectDropDown from "@/components/shared/inputs/SelectDropDown"
import { t } from "i18next"

const statuses = [
    {
        id: 1,
        name: "სტატუს 1"
    },
    {
        id: 2,
        name: "სტატუს 2"
    },
    {
        id: 3,
        name: "სტატუს 3"
    },
    {
        id: 4,
        name: "სტატუს 4"
    },
    {
        id: 5,
        name: "სტატუს 5"
    },
    {
        id: 6,
        name: "სტატუს 6"
    }
]

interface IEditBookingProps {
    statusId: number
    isButton?: boolean
}

const EditBooking: FunctionComponent<IEditBookingProps> = ({ statusId, isButton }) => {
    return (
        <Dialog>
            {isButton ? (
                statusId === 5 ? (
                    <SecondaryButton className="cursor-not-allowed opacity-40">{t("bookings.actionButtons.edit")}</SecondaryButton>
                ) : (
                    <DialogTrigger asChild>
                        <SecondaryButton>{t("bookings.actionButtons.edit")}</SecondaryButton>
                    </DialogTrigger>
                )
            ) : (
                statusId === 5 ? (
                    <div className="w-full [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-not-allowed opacity-40">
                        <Pencil /> {t("bookings.actionButtons.edit")}
                    </div>
                ) : (
                    <DialogTrigger className="w-full [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer">
                        <Pencil /> {t("bookings.actionButtons.edit")}
                    </DialogTrigger>
                )
            )}

            <DialogContent className="max-w-[500px] w-full">
                <DialogHeader>
                    <DialogTitle>{t("bookings.statusOptions.title")}</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className="booking_edit_dialog-body">
                    <SelectDropDown
                        label={t("bookings.statusOptions.title")}
                        options={statuses}
                        defaultValue={statusId}
                        sentId
                    />
                </div>
                <DialogFooter>
                    <SecondaryButton>{t("bookings.button.close")}</SecondaryButton>
                    <PrimaryButton>{t("bookings.button.save")}</PrimaryButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditBooking

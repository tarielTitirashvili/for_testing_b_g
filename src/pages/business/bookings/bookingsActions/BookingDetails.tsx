import { useState, type FunctionComponent } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, Phone, User } from "lucide-react"

import StatusBadge, { type BadgeVariant } from "@/components/shared/buttons/BookingStatusBadges"

import type { BookingType } from "../constants"

import { t } from "i18next"

import dayjs from "dayjs"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import { useForm } from "react-hook-form"

interface IBookingDetailsProps {
    open: boolean,
    setOpen: (isOpenStatus: boolean) => void
    bookingId: number
    booking: BookingType
    variant: BadgeVariant
    businessType: 1 | 2 | null
    changeNoShowStatusMutation: (orderId: number) => void
}

const BookingDetails: FunctionComponent<IBookingDetailsProps> = ({ open, setOpen, bookingId, businessType, booking, variant, changeNoShowStatusMutation }) => {
    
    const { handleSubmit } = useForm<{ orderId: number }>()
    
    const [selectedStatus, setSelectedStatus] = useState<BadgeVariant>(variant)

    const FINAL_STATUSES: BadgeVariant[] = ['completed', 'canceled']

    const isLocked = FINAL_STATUSES.includes(variant)

    const toBadgeVariant = (value: string) => value as BadgeVariant

    const renderStatuses = (status: BadgeVariant) => {

        let options: BadgeVariant[] = []

        if (status === 'confirmed') {
            options = ['confirmed', 'completed', 'canceled']
        }

        if (status === 'noShow') {
            options = ['completed', 'noShow']
        }

        if (status === 'completed' || status === 'canceled') {
            options = [status]
        }

        return options.map((item) => {
            const isSelected = selectedStatus === item

            return (
                <button
                    key={item}
                    type="button"
                    disabled={isLocked}
                    onClick={() => setSelectedStatus(item)}
                    className={`disabled:opacity-40 ${isLocked ? 'cursor-not-allowed' : "cursor-pointer"}`}
                >   
                    <StatusBadge
                        dot
                        variant={toBadgeVariant(isSelected ? `${item}Selected` : `${item}NotSelected`)}
                        label={item}
                        isSelected={isSelected}
                    />
                </button>
            )
        })
    }

    const handleStatus = (orderId: number) => {
        if (variant === 'noShow' && selectedStatus === 'completed') {
            changeNoShowStatusMutation(orderId)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-[500px] w-full flex flex-col gap-6">
                <DialogHeader>
                    <DialogTitle className="font-semibold text-xl">{t("bookings.table.detail")}</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className="booking_dialog-body flex flex-col gap-6">
                    <div className="booking_detail-row grid grid-cols-2 justify-between">
                        <div className="booking_detail-cell flex flex-col gap-1">
                            <p className="text-lg font-semibold">{t("bookings.table.guest")}:</p>
                            <div>
                                <div className="flex items-center font-medium gap-1">
                                    <User color="#6C6C6C" size={16} /> <span>{booking.customer}</span>
                                </div>
                                <div className="flex items-center font-medium gap-1">
                                    <Phone color="#6C6C6C" size={16} /> <span>{booking.phone}</span>
                                </div>
                            </div>
                        </div>
                        <div className="booking_detail-cell flex flex-col gap-1">
                            <p className="text-lg font-semibold">{t("bookings.table.date&time")}:</p>
                            <div>
                                <div className="flex items-center gap-1">
                                    <Calendar color="#6C6C6C" size={16} /> <span>{dayjs(booking.dateTime).format('DD.MM.YYYY')}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock color="#6C6C6C" size={16} /> <span>{dayjs(booking.dateTime).format('HH:mm')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {businessType === 1 && (
                        <>
                            <div className="booking_detail-row grid grid-cols-2 justify-between">
                                <div className="booking_detail-cell flex flex-col gap-1">
                                    <p className="text-lg font-semibold">{t("bookings.table.guestCount")}</p>
                                    <div>
                                        {booking.guestsAmount}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {businessType === 2 && (
                        <>
                            <div className="booking_detail-row grid grid-cols-2 justify-between">
                                <div className="booking_detail-cell flex flex-col gap-1">
                                    <p className="text-lg font-semibold">{t("bookings.table.service")}:</p>
                                    <div>
                                        <div className="flex items-center font-medium gap-1">
                                            <span className="border-3 text-base font-medium py-1 px-2 rounded-full border-[#EBEBEB]">{booking.service}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="booking_detail-cell flex flex-col gap-1">
                                    <p className="text-lg font-semibold">{t("bookings.inputLabel.specialist")}</p>
                                    <div>
                                        <div className="flex items-center font-medium gap-1">
                                            {booking.teamMember}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="booking_detail-row grid grid-cols-2 justify-between">
                                <div className="booking_detail-cell flex flex-col gap-1">
                                    <p className="text-lg font-semibold">{t("bookings.table.duration")}:</p>
                                    <div>
                                        <div className="flex items-center font-medium gap-1">
                                            {booking.duration}
                                        </div>
                                    </div>
                                </div>
                                <div className="booking_detail-cell flex flex-col gap-1">
                                    <p className="text-lg font-semibold">{t("bookings.table.price")}:</p>
                                    <div>
                                        <div className="flex items-center font-medium gap-1">
                                            {booking.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit(() => handleStatus(bookingId))}>
                        <div className="booking_detail-row justify-between">
                            <div className="booking_detail-cell flex flex-col gap-1">
                                <p className="text-lg font-semibold">{t("bookings.statusOptions.title")}:</p>
                                <div className="flex flex-wrap gap-2">
                                    {renderStatuses(variant)}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <SecondaryButton>{t("bookings.button.close")}</SecondaryButton>
                            </DialogClose>
                            <PrimaryButton type="submit">{t("bookings.button.save")}</PrimaryButton>
                        </DialogFooter>
                    </form>
                </div>
                
            </DialogContent>
        </Dialog>
    )
}

export default BookingDetails

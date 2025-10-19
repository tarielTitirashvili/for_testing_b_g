import { useState, type FunctionComponent } from "react"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"

import { LockKeyhole } from "lucide-react"

import { t } from "i18next"

const BlockTable: FunctionComponent = () => {

    const [blockedTime, setBlockedTime] = useState<number | null>(null)

    const handleBlockedTime = (id: number): void => {
        setBlockedTime(prev => prev === id ? null : id)
    }

    const blockedTimes = [
        {
            id: 1,
            hour: 1,
        },
        {
            id: 2,
            hour: 2,
        },
        {
            id: 3,
            hour: 3,
        },
        {
            id: 4,
            hour: 4,
        },
        {
            id: 5,
            hour: 5,
        },
        {
            id: 6,
            hour: 6,
        },
        {
            id: 7,
            hour: 7,
        },
        {
            id: 8,
            hour: 8,
        }
    ]

    return (

        <Dialog>
            <DialogTrigger className="focus:bg-accent hover:bg-accent w-full focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                <LockKeyhole color="#E81C1C" /> <span className="text-[#E81C1C]">{ t("bookings.actionButtons.block") }</span>
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full rounded-sm flex flex-col gap-6 px-6 py-10">
                <DialogHeader>
                    <DialogTitle className="text-[#242424] text-xl font-bold">
                        { t("space.modal.blockTime.title") }
                    </DialogTitle>
                </DialogHeader>
                <div className="dialog_body flex flex-col gap-2">
                    <DialogDescription className="text-[#242424] text-sm font-medium">
                        { t("space.modal.blockTime.subtitle") }
                    </DialogDescription>
                    <div className="blocking_time-list flex flex-wrap gap-3">
                        {blockedTimes.map(time => (
                            <button
                                className={`flex items-center justify-center gap-1 border-[#BEBEBE] border-2 rounded-md py-2 px-2 font-semibold cursor-pointer w-[100px] grow ${blockedTime === time.id && 'bg-[#D61111] text-white border-transparent'}`} key={time.id}
                                onClick={() => handleBlockedTime(time.id)}
                            >
                                {`${time.hour.toString()} ${t("calendar.text.hour")}`}
                            </button>
                        ))}
                        <button
                            className={`flex items-center justify-center gap-1 border-[#BEBEBE] border-2 rounded-md py-2 px-2 font-semibold cursor-pointer w-[100px] grow ${blockedTime === -1 && 'bg-[#D61111] text-white border-transparent'}`} 
                            onClick={() => handleBlockedTime(-1)}
                        >
                            { t("bookings.actionButtons.untilChange") }
                        </button>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose className="flex items-center justify-center gap-1 w-full border-[#BEBEBE] border-2 rounded-md py-2 px-2 font-semibold cursor-pointer">
                        { t("bookings.actionButtons.cancel") }
                    </DialogClose>
                    <PrimaryButton className="bg-[#D61111] font-semibold">{ t("bookings.actionButtons.save") }</PrimaryButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default BlockTable
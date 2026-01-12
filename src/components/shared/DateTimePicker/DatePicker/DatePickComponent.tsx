import { useState, type FunctionComponent } from "react";

import { Dialog, DialogContent,DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";

import DatePickerScroll from "../../sliders/DatePickerScroll";
import DatePickerInput from "../../inputs/DatePickerInput";
import PrimaryButton from '../../buttons/PrimaryButton'
import SecondaryButton from '../../buttons/SecondaryButton'

import dayjs from "dayjs";

interface IDatePickComponentProps {
    value?: string
    onChange: (val: string) => void
    onSave: () => void
    error: string
}

const DatePickComponent: FunctionComponent<IDatePickComponentProps> = ({ value, onChange, onSave, error }) => {

    const [dateInputExpand, setDateInputExpand] = useState<null | 'startTime' | 'endTime'>(null)
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const handleDateInputExpand = (type: 'startTime' | 'endTime'): void => {
        setDateInputExpand(prev => prev === type ? null : type)
    }

    const handleSave = () => {
        onSave()
        setModalOpen(false)
    }

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger className="w-full">
                <div className="text-left">
                    <DatePickerInput
                        date={value}
                        error={error}
                    />
                    { error && <span className="text-xs text-red-500 font-medium">{ error }</span>}

                </div>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="datepicker-dialog-content max-w-[320px] w-full">
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium">
                        Pick a Date
                    </DialogTitle>
                    <DialogDescription className="hidden" />
                </DialogHeader>
                <div className={`date_pick-block flex flex-col items-center gap-2.5 overflow-hidden cursor-pointer ${dateInputExpand === 'startTime' ? 'date_pick-block-expanded' : 'h-[45px]'}`}>
                    <div
                        className="date_pick-input flex items-center w-full border-2 border-[#EBEBEB] p-2 rounded-md"
                        onClick={() => handleDateInputExpand('startTime')}
                    >
                        <div className={`date_pick-input_text flex-1 text-sm font-medium ${dateInputExpand === 'startTime' && 'text-button-color' }`}>
                            Start Time
                        </div>
                        <div className={`date_pick-input_arrow transition-transform duration-300 ${dateInputExpand === 'startTime' ? 'rotate-180' : 'rotate-0'}`}>
                            <ChevronDown />
                        </div>
                    </div>
                    <div className="date_pick-component w-full">
                        <DatePickerScroll
                            date={value ? dayjs(value) : undefined}
                            onChange={(date) => onChange(date.format('YYYY-MM-DD'))}
                        />
                    </div>
                </div>
                {/* <div className={`date_pick-block flex flex-col items-center gap-2.5 overflow-hidden cursor-pointer ${dateInputExpand === 'endTime' ? 'date_pick-block-expanded' : 'h-[45px]'}`}>
                    <div
                        className="date_pick-input flex items-center w-full border-2 border-[#EBEBEB] p-2 rounded-md"
                        onClick={() => handleDateInputExpand('endTime')}
                    >
                        <div className={`date_pick-input_text flex-1 text-sm font-medium ${dateInputExpand === 'endTime' && 'text-[#EF7800]' }`}>
                            End Time
                        </div>
                        <div className={`date_pick-input_arrow transition-transform duration-200 ${dateInputExpand === 'endTime' ? 'rotate-180' : 'rotate-0'}`}>
                            <ChevronDown />
                        </div>
                    </div>
                    <div className="date_pick-component w-full">
                        <DatePickerScroll />
                    </div>
                </div> */}
                <DialogFooter>
                    <div className="date_pick-buttons flex flex-col gap-2.5 w-full">
                        <div className="date_pick-button">
                            <PrimaryButton handleClick={handleSave} children='Save' />
                        </div>
                        <DialogClose asChild>
                            <div className="date_pick-button">
                                <SecondaryButton children="Cancel" />
                            </div>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DatePickComponent
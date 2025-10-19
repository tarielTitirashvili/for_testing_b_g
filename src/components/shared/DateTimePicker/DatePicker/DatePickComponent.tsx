import { useState, type FunctionComponent } from "react";

import { Dialog, DialogContent,DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";

import DatePickerScroll from "../../sliders/DatePickerScroll";
import DatePickerInput from "../../inputs/DatePickerInput";
import PrimaryButton from '../../buttons/PrimaryButton'
import SecondaryButton from '../../buttons/SecondaryButton'

const DatePickComponent: FunctionComponent = () => {

    const [dateInputExpand, setDateInputExpand] = useState<null | 'startTime' | 'endTime'>(null)
    
    const handleDateInputExpand = (type: 'startTime' | 'endTime'): void => {
        setDateInputExpand(prev => prev === type ? null : type)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className="text-left">
                    <DatePickerInput />
                </div>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="max-w-[320px] w-full">
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium">
                        Pick a Date
                    </DialogTitle>
                </DialogHeader>
                <div className={`date_pick-block flex flex-col items-center gap-2.5 overflow-hidden cursor-pointer ${dateInputExpand === 'startTime' ? 'date_pick-block-expanded' : 'h-[45px]'}`}>
                    <div
                        className="date_pick-input flex items-center w-full border-2 border-[#EBEBEB] p-2 rounded-md"
                        onClick={() => handleDateInputExpand('startTime')}
                    >
                        <div className={`date_pick-input_text flex-1 text-sm font-medium ${dateInputExpand === 'startTime' && 'text-[#EF7800]' }`}>
                            Start Time
                        </div>
                        <div className={`date_pick-input_arrow transition-transform duration-300 ${dateInputExpand === 'startTime' ? 'rotate-180' : 'rotate-0'}`}>
                            <ChevronDown />
                        </div>
                    </div>
                    <div className="date_pick-component w-full">
                        <DatePickerScroll />
                    </div>
                </div>
                <div className={`date_pick-block flex flex-col items-center gap-2.5 overflow-hidden cursor-pointer ${dateInputExpand === 'endTime' ? 'date_pick-block-expanded' : 'h-[45px]'}`}>
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
                </div>
                <DialogFooter>
                    <div className="date_pick-buttons flex flex-col gap-2.5 w-full">
                        <div className="date_pick-button">
                            <PrimaryButton children='Save' />
                        </div>
                        <DialogClose>
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
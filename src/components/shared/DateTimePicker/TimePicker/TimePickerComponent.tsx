import { useState, type FunctionComponent } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import TimePickInput from "@/components/shared/inputs/TimePickInput";
import TimeSlider from "@/components/shared/sliders/TimeSlider";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";


const timeSlots = Array.from({ length: 96 }, (_, i) => {
  const hours = Math.floor(i / 4);
  const minutes = (i % 4) * 15;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});
interface TimePickerComponentProps {
    defaultValue?: string //! this should be a string based on timeSlots
    onChange: (val: string) => void
    error: string
    disabled: boolean
}

const TimePickerComponent: FunctionComponent<TimePickerComponentProps> = ({ defaultValue, onChange, error, disabled }) => {

    const { t } = useTranslation()

    const [dateInputExpand, setDateInputExpand] = useState<null | "startTime" | "endTime">('startTime');
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const [startTime, setStartTime] = useState<string>(
        defaultValue ? 
            timeSlots.find(time => time === defaultValue) || timeSlots[6] 
        :
            timeSlots[6]
    );
    // const [endTime, setEndTime] = useState<string>(timeSlots[6]);

    const handleDateInputExpand = (type: "startTime" | "endTime"): void => {
        setDateInputExpand((prev) => (prev === type ? null : type));
    };

    const handleSave = () => {
        setModalOpen(false)
        onChange(startTime)
    }

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger disabled={disabled} className="flex flex-col justify-start items-start">
                <div className="time_pick_inputs flex flex-1 w-full gap-3">
                    <TimePickInput
                        disabled={disabled}
                        label={t("bookings.inputLabel.startTime")}
                        time={ startTime }
                        error={error}
                    />
                    {/* <TimePickInput
                        label={t("bookings.inputLabel.endTime")}
                        time={ endTime }
                        error={error}
                    /> */}
                </div>
                { error && <span className="text-xs text-red-500 font-medium">{ error }</span>}
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="timepicker-dialog-content max-w-[320px] w-full">
                <DialogHeader>
                    <DialogTitle>
                        { t("bookings.timePicker.title") }
                    </DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <div className="time_pick-container bg-white max-w-[320px] w-full flex flex-col gap-3 rounded-md">
                    <div className={`time_pick-block flex flex-col items-center gap-2.5 overflow-hidden cursor-pointer ${dateInputExpand === 'startTime' ? 'time_pick-block-expanded' : 'h-11.25'}`}>
                        <div
                            className="time_pick-input flex items-center w-full border-2 border-[#EBEBEB] p-2 rounded-md"
                            onClick={() => handleDateInputExpand('startTime')}
                        >
                            <div className={`time_pick-input_text flex-1 text-sm font-semibold ${dateInputExpand === 'startTime' && 'text-button-color' }`}>
                                {t("bookings.inputLabel.startTime")}
                            </div>
                            <div className={`time_pick-input_arrow transition-transform duration-300 ${dateInputExpand === 'startTime' ? 'rotate-180' : 'rotate-0'}`}>
                                <ChevronDown />
                            </div>
                        </div>
                        <div className="time_pick-component w-full">
                            <TimeSlider
                                selectedTime={startTime}
                                setSelectedTime={setStartTime}
                                timeSlots={timeSlots}
                            />
                        </div>
                    </div>
                    {/* <div className={`time_pick-block flex flex-col items-center gap-2.5 overflow-hidden cursor-pointer ${dateInputExpand === 'endTime' ? 'time_pick-block-expanded' : 'h-[45px]'}`}>
                        <div
                            className="time_pick-input flex items-center w-full border-2 border-[#EBEBEB] p-2 rounded-md"
                            onClick={() => handleDateInputExpand('endTime')}
                        >
                            <div className={`time_pick-input_text flex-1 text-sm font-semibold ${dateInputExpand === 'endTime' && 'text-[#EF7800]' }`}>
                                {t("bookings.inputLabel.endTime")}
                            </div>
                            <div className={`time_pick-input_arrow transition-transform duration-200 ${dateInputExpand === 'endTime' ? 'rotate-180' : 'rotate-0'}`}>
                                <ChevronDown />
                            </div>
                        </div>
                        <div className="time_pick-component w-full">
                            <TimeSlider
                                selectedTime={endTime}
                                setSelectedTime={setEndTime}
                                timeSlots={timeSlots}
                            />
                        </div>
                    </div> */}
                    <div className="time_pick-buttons flex flex-col gap-3">
                        <div className="time_pick-button font-bold">
                            <PrimaryButton className="font-semibold" handleClick={handleSave}>
                                { t("bookings.actionButtons.save") }
                            </PrimaryButton>
                        </div>
                        <DialogClose asChild>
                            <div className="time_pick-button">
                                <SecondaryButton className="font-semibold">
                                    { t("bookings.actionButtons.cancel") }
                                </SecondaryButton>
                            </div>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TimePickerComponent;
import { useState, type FunctionComponent } from "react";
import type { UseFormSetValue } from "react-hook-form";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";

import { ChevronDown } from "lucide-react";
import TimePickInput from "@/components/shared/inputs/TimePickInput";
import TimeSlider from "@/components/shared/sliders/TimeSlider";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface IBusinessFormData {
    businessName: string
    businessDescription: string
    startTime: string
    endTime: string
    businessPhone: string
    businessMail: string
    businessSite: string
    businessTikTok: string
    businessInstagram: string
    businessFacebook: string
    businessAddress: string
}

const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

interface TimePickerComponentProps {
    setValue: UseFormSetValue<IBusinessFormData>;
}

const TimePickerComponent: FunctionComponent<TimePickerComponentProps> = ({ setValue }) => {

    const { t } = useTranslation()

    const [dateInputExpand, setDateInputExpand] = useState<null | "startTime" | "endTime">(null);
    const [startTime, setStartTime] = useState<string>(timeSlots[6]);
    const [endTime, setEndTime] = useState<string>(timeSlots[6]);

    const handleDateInputExpand = (type: "startTime" | "endTime"): void => {
        setDateInputExpand((prev) => (prev === type ? null : type));
    };

    const handleSave = (): void => {
        setValue("startTime", startTime);
        setValue("endTime", endTime);
        toast.success("Time Was Saved Successfully", {
            description: `Time Set From ${startTime} To ${endTime}`,
        })
    };

    return (
        <Dialog>

            <DialogTrigger>
                <div className="time_pick_inputs flex gap-3">
                    <TimePickInput
                        label={t("bookings.inputLabel.startTime")}
                        time={ startTime }
                    />
                    <TimePickInput
                        label={t("bookings.inputLabel.endTime")}
                        time={ endTime }
                    />
                </div>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="max-w-[320px] w-full">
                <DialogHeader>
                    <DialogTitle>
                        { t("bookings.timePicker.title") }
                    </DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <div className="time_pick-container bg-white max-w-[320px] w-full flex flex-col gap-3 rounded-md">
                    <div className={`time_pick-block flex flex-col items-center gap-2.5 overflow-hidden cursor-pointer ${dateInputExpand === 'startTime' ? 'time_pick-block-expanded' : 'h-[45px]'}`}>
                        <div
                            className="time_pick-input flex items-center w-full border-2 border-[#EBEBEB] p-2 rounded-md"
                            onClick={() => handleDateInputExpand('startTime')}
                        >
                            <div className={`time_pick-input_text flex-1 text-sm font-semibold ${dateInputExpand === 'startTime' && 'text-[#EF7800]' }`}>
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
                    <div className={`time_pick-block flex flex-col items-center gap-2.5 overflow-hidden cursor-pointer ${dateInputExpand === 'endTime' ? 'time_pick-block-expanded' : 'h-[45px]'}`}>
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
                    </div>
                    <div className="time_pick-buttons flex flex-col gap-3">
                        <div className="time_pick-button font-bold">
                            <PrimaryButton handleClick={handleSave} className="font-semibold">
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
import type { FunctionComponent } from "react";
import DateTimeSlider from "./DateTimeSlider";


interface ITimeSliderProps {
    timeSlots: string[]
    selectedTime: string
    setSelectedTime: (param: string) => void
}

const TimeSlider: FunctionComponent<ITimeSliderProps> = ({ timeSlots, selectedTime, setSelectedTime }) => {
    return (
        <div>
            <DateTimeSlider
                initialIndex={timeSlots.indexOf(selectedTime)}
                list={timeSlots}
                onSelect={(val) => setSelectedTime(val.toString())}
                className="w-full h-[220px]"
            />
        </div>
    );
};

export default TimeSlider;

import { useState } from "react";
import DateTimeSlider from "./DateTimeSlider";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);

const today = new Date();
const currentMonthIndex = today.getMonth();
const currentDayIndex = today.getDate() - 1;
const currentYearIndex = years.indexOf(currentYear);

const DatePickerScroll = () => {

    const [month, setMonth] = useState<string>(months[currentMonthIndex]);
    const [day, setDay] = useState<number>(days[currentDayIndex]);
    const [year, setYear] = useState<number>(currentYear);

    console.log(`${month} / ${day} / ${year}`)

    return (
        <div className="flex items-center justify-between">
            <DateTimeSlider
                initialIndex={currentMonthIndex}
                list={months}
                onSelect={(val) => setMonth(val.toString())}
            />
            <DateTimeSlider
                initialIndex={currentDayIndex}
                list={days}
                onSelect={(val) => setDay(+val)}
            />
            <DateTimeSlider
                initialIndex={currentYearIndex}
                list={years}
                onSelect={(val) => setYear(+val)}
            />
        </div>
    );
};

export default DatePickerScroll;
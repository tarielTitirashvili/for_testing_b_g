import { type FunctionComponent } from "react"

import { Input } from '@/components/ui/input'
import { Calendar, ChevronDown } from "lucide-react"

const DatePickerInput: FunctionComponent = () => {

    return (
        <div className="date_picker_input-wrapper flex flex-col gap-2">
            <div className={`date_picker_input-label text-left text-lg font-medium`}>
                Date
            </div>
            <div className={`date_picker_input relative max-w-[280px] w-full h-[48px] flex items-center`}>
                <div className="date_picker_input-icon absolute left-[10px] top-1/2 -translate-y-1/2">
                    <Calendar className="h-6 w-6" />
                </div>
                <div className="date_picker_input-body w-full">
                    <Input
                        className="date_picker_input-placeholder text-lg pl-10 border-2 rounded-md w-full py-2 flex items-center cursor-pointer"
                        placeholder="Select Date"
                        readOnly
                    />
                </div>
                <div className="date_picker_input-dropdown absolute right-[10px] top-1/2 -translate-y-1/2">
                    <ChevronDown />
                </div>
            </div>
        </div>
    )
}

export default DatePickerInput
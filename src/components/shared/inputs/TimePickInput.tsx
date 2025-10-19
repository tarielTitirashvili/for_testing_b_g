import type { FunctionComponent } from "react"
import { Input } from '@/components/ui/input'
import { Clock } from "lucide-react"

interface ITimePickInput {
    label: string
    time: string
}

const TimePickInput: FunctionComponent<ITimePickInput> = ({ label, time }) => {
    return (
        <div className="date_picker_input-wrapper flex flex-col gap-2 flex-1">
            <div className={`date_picker_input-label text-left text-sm font-medium`}>
                { label }
            </div>
            <div className={`date_picker_input relative w-full h-[48px] flex items-center`}>
                <div className="date_picker_input-icon absolute left-[10px] top-1/2 -translate-y-1/2">
                    <Clock className="h-6 w-6" />
                </div>
                <div className="date_picker_input-body w-full">
                    <Input
                        className="date_picker_input-placeholder text-base pl-10.5 border-2 rounded-md w-full py-2 flex items-center cursor-pointer"
                        placeholder={ time }
                        readOnly
                    />
                </div>
            </div>
        </div>
    )
}

export default TimePickInput
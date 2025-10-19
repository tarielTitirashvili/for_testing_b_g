import CustomDropdown from "@/components/shared/buttons/CustomDropdown"
import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useState, type FunctionComponent } from "react"

const periods = [
    { value: 'day', days: 1 },
    { value: 'week', days: 7 },
    { value: 'month', days: 30 },
    { value: 'year', days: 365 },
]

const screenWidth = innerWidth;

const DateInfoSelectInput: FunctionComponent = () => {

    const [periodValue, setPeriodValue] = useState('1 Day')

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="title text-sm font-medium">
                Period
            </div>
            <CustomDropdown
                className="w-full"
                trigger={
                    <div className="bg-white w-full flex justify-between px-3 py-2 capitalize rounded-sm">
                        {periodValue}
                        <ChevronDown />
                    </div>
                }
                children={
                    <DropdownMenuGroup className="w-full">
                        {periods.map((period, index) => (
                            <DropdownMenuItem   
                                key={index}
                                className="capitalize"
                                style={{ width: screenWidth - 30 }}
                                onClick={() => setPeriodValue(1 + " " + period.value)}
                            >
                                1 { period.value }
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                }
            >

            </CustomDropdown>
        </div>
    )
}

export default DateInfoSelectInput
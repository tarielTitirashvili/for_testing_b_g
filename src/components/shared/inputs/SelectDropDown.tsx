import type { FunctionComponent, SelectHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { t } from "i18next"

interface ISelectDropDownProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: { id: string, name: string }[] | null
    error?: string
    label?: string
    className?: string
    sentId?: boolean
}

const SelectDropDown: FunctionComponent<ISelectDropDownProps> = ({ options, sentId, error, label, className, ...props }) => {
    return (
        <div className="flex flex-col gap-1.5">
            <span
                className={`text-sm font-medium text-[#242424] ${error && 'text-red-500 font-medium'}`}
            >
                { label && label }
            </span>
            <div className="w-full">
                <select
                    className={cn(
                        "border-2 rounded-sm border-[#EBEBEB] w-full text-base p-2 text-[#6C6C6C] focus:outline-none focus:border-[#EF7800]",
                        error && "border-red-500 focus:border-red-500",
                        className
                    )}
                    {...props}
                    onBlur={props.onBlur}
                >
                    <option value="">
                        { t('bookings.button.pickCategory') }
                    </option>
                    {options && options.map((option) => (
                        <option
                            key={option.id}
                            value={sentId ? option.id : option.name}
                        >
                            { option.name }
                        </option>
                    ))}
                </select>
                { error && <span className="text-xs text-red-500 font-medium">{ error }</span>}
            </div>
        </div>
    )
}

export default SelectDropDown
import type { InputHTMLAttributes } from "react"
import { Input } from "../../ui/input"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    className?: string
    error?: string
    InputIcon?: LucideIcon
}


const TextInput: React.FunctionComponent<ITextInputProps> = ({ label, className, error, InputIcon, ...inputProps }) => {
    return (
        <label className="flex flex-col gap-1.5 flex-1">
            <span
                className={`flex items-center gap-1 text-sm font-medium text-[#242424] ${error && 'text-red-500 font-medium'}`}
            >
                { InputIcon && <InputIcon size={18} />} { label && label }
            </span>
            <div className="w-full">
                <Input
                    className={cn(
                        "input_appearance_none border-2 rounded-sm border-[#EBEBEB] w-full h-12 p-2 text-base text-[#6C6C6C] appearance-none",
                        error && "border-red-500 focus:border-red-500",
                        inputProps.disabled && 'cursor-not-allowed',
                        className
                    )}
                    {...inputProps}
                />
                { error && <span className="text-xs text-red-500 font-medium">{ error }</span>}
            </div>
        </label>
    )
}

export default TextInput
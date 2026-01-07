import type { TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

interface ITextareaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    className?: string
    error?: string
}

const TextareaInput: React.FunctionComponent<ITextareaInputProps> = ({ label, className, error, ...inputProps }) => {
    return (
        <label className="flex flex-col gap-1.5">
            <span
                className={`text-sm font-medium text-[#242424] ${error && 'text-red-500 font-medium'}`}
            >
                {label}
            </span>
            <div className="w-full">
                <Textarea
                    className={cn(
                        "border-2 rounded-sm border-[#EBEBEB] w-full text-base p-2 text-[#6C6C6C] resize-none",
                        error && "border-red-500 focus:border-red-500",
                        className
                    )}
                    {...inputProps}
                />
                { error && <span className="text-xs text-red-500 font-medium">{ error }</span>}
            </div>
        </label>
    )
}

export default TextareaInput
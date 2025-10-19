
import type { InputHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface IPhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string;
    className?: string;
    InputIcon?: LucideIcon
}

const PhoneInput: React.FunctionComponent<IPhoneInputProps> = ({ label, error, className, InputIcon, ...inputProps }) => {
    
    return (
        <div className="flex flex-col gap-1.5">
            <span
                className={`flex items-center gap-1 text-sm font-medium text-[#242424] ${error && "text-red-500 font-medium"}`}
            >
               { InputIcon && <InputIcon size={18} /> } { label }
            </span>
            <div className="relative w-full">
                <span className="absolute top-1/2 -translate-y-1/2 left-2 text-[#4F4F53]">
                    +995
                </span>
                <Input
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    className={cn(
                        "border-2 rounded-sm border-[#EBEBEB] w-full text-base ps-12 py-1.5 text-[#4F4F53]",
                        error && "border-red-500",
                        className
                    )}
                    {...inputProps}
                />
            </div>
            {error && (
                <span className="text-xs text-red-500 font-medium">
                    {error}
                </span>
            )}
        </div>
    );
};

export default PhoneInput;
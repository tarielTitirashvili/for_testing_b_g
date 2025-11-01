import { cn } from "@/lib/utils"
import type { ComponentProps } from "react";

type TProps = ComponentProps<"input"> & { error?: string };

function Input({ className, type, error, ...props }: TProps) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                `border-2 rounded-sm ${error ? 'border-red-500' : 'border-[#EBEBEB]' } w-full text-base p-1.5 text-[#6C6C6C]`,
                "focus:outline-none focus:border-[#EF7800]",
                className
            )}
            {...props}
        />
    )
}

export { Input }

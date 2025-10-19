import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "border-2 rounded-sm border-[#EBEBEB] w-full text-base p-1.5 text-[#6C6C6C]",
                "focus:outline-none focus:border-[#EF7800]",
                className
            )}
            {...props}
        />
    )
}

export { Input }

import { cn } from "@/lib/utils"
import type { FunctionComponent, ReactNode } from "react"

interface IPrimaryPressable {
    onClick?: () => void
    className?: string
    children: ReactNode
}

const PrimaryPressable: FunctionComponent<IPrimaryPressable> = ({ onClick, className, children }) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'flex items-center justify-center gap-1 bg-[#EF7800] font-medium cursor-pointer text-white w-full rounded-md px-2 py-2',
                className
            )
        }>
            { children }
        </div>
    )
}

export default PrimaryPressable

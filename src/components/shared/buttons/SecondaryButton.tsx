import type { FunctionComponent, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface ISecondaryButtonProps {
    children: ReactNode
    className?: string
    onClick?: () => void
    icon?: ReactNode
}

const SecondaryButton: FunctionComponent<ISecondaryButtonProps> = ({ children, className, icon, onClick }) => {
    return (
        <button className={cn(
                "flex items-center justify-center gap-1 w-full border-[#BEBEBE] border-2 rounded-md py-2 px-2 font-medium cursor-pointer",
                className
            )}
            onClick={onClick}
            type="button"
        >
            { icon && icon } { children }
        </button>
    )
}

export default SecondaryButton
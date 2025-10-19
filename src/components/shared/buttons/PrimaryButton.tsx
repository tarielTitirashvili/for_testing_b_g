import type { FunctionComponent, ReactNode } from "react"

import { cn } from "@/lib/utils"
import { LoaderCircle } from 'lucide-react'

interface IPrimaryButtonProps {
    children: ReactNode
    className?: string
    disabled?: boolean
    loading?: boolean
    handleClick?: () => void
    icon?: ReactNode
}

const PrimaryButton: FunctionComponent<IPrimaryButtonProps> = ({ children, className, handleClick, disabled, loading }) => {
    return (
        <button
            disabled={disabled || loading}
            onClick={handleClick}
            className={cn(
                `flex items-center justify-center gap-1 bg-[#EF7800] font-medium text-white w-full rounded-md px-2 py-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
                className
            )}>
                {
                    loading && <div className="flex items-center justify-center">
                        <LoaderCircle className="animate-spin text-white-500" size={32} strokeWidth={2} />
                    </div>
                }
            { children }
        </button>
    )
}

export default PrimaryButton
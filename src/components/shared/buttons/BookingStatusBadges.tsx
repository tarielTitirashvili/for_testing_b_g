import { type FunctionComponent } from "react";

import { Badge } from "@/components/ui/badge";

export type BadgeVariant = "confirmed" | 'confirmedSolid' | "completed" | "pending" | 'pendingSolid' | "canceled" | "noShow"

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
    confirmed: { bg: "bg-[#ECF3FF]", text: "text-[#2369DC]" },
    confirmedSolid: { bg: "bg-[#3B81F6]", text: "text-[#FFFFFF]" },
    completed: { bg: "bg-[#E9FAEF]", text: "text-[#008230]" },
    pending: { bg: "bg-[#FDF8E6]", text: "text-[#8F6C00]" },
    pendingSolid: { bg: "bg-[#EAB305]", text: "text-[#FFFFFF]" },
    canceled: { bg: "bg-[#FDE9E9]", text: "text-[#D61111]" },
    noShow: { bg: "bg-[#F0E7FD]", text: "text-[#6011D0]" },
}

interface IStatusBadgeProps {
    variant: BadgeVariant
    label: string
    className?: string
}

const StatusBadge: FunctionComponent<IStatusBadgeProps> = ({ variant, label, className }) => {

    const { bg, text } = variantStyles[variant]

    return (
        <Badge
            className={`p-1 max-w-[150px] w-full font-medium rounded-full ${bg} ${text} ${className}`}
        >
            { label }
        </Badge>
    )
}

export default StatusBadge
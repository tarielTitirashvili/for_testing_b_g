import { type FunctionComponent } from "react";

import { Badge } from "@/components/ui/badge";

export type BadgeVariant = "confirmed" | 'confirmedSolid' | "confirmedSelected" | "confirmedNotSelected" | "completed" | "completedSelected" | "completedNotSelected" | "completedSolid" | "pending" | 'pendingSolid' | "canceled"  | "canceledSelected" | "canceledNotSelected" | "noShow" | "noShowSelected" | "noShowNotSelected"

const variantStyles: Record<BadgeVariant, { bg: string; text: string, border?: string, dotColor?: string }> = {
    confirmed: { bg: "bg-[#ECF3FF]", text: "text-[#2369DC]", dotColor: "bg-[#3B81F6]" },
    confirmedSelected: { bg: "bg-[#E5EFFF]", text: "text-[#3B81F6]", dotColor: "bg-[#3B81F6]" },
    confirmedNotSelected: {bg: "bg-transparent", text: "text-black", border: "border-2 border-[#EBEBEB]", dotColor: "bg-[#3B81F6]" },
    confirmedSolid: { bg: "bg-[#3B81F6]", text: "text-[#FFFFFF]", dotColor: "bg-[#3B81F6]" },

    completed: { bg: "bg-[#E9FAEF]", text: "text-[#008230]", dotColor: "bg-[#21C55D]" },
    completedSelected: { bg: "bg-[#E6F9ED]", text: "text-[#21C55D]", dotColor: "bg-[#21C55D]" },
    completedNotSelected: {bg: "bg-transparent", text: "text-black", border: "border-2 border-[#EBEBEB]", dotColor: "bg-[#21C55D]" },
    completedSolid: { bg: "bg-[#3B81F6]", text: "text-[#FFFFFF]", dotColor: "bg-[#21C55D]" },

    pending: { bg: "bg-[#FDF8E6]", text: "text-[#8F6C00]", dotColor: "" },
    pendingSolid: { bg: "bg-[#EAB305]", text: "text-[#FFFFFF]", dotColor: "" },

    canceled: { bg: "bg-[#FDE9E9]", text: "text-[#D61111]", dotColor: "bg-[#E81C1C]" },
    canceledSelected: { bg: "bg-[#FDE9E9]", text: "text-[#E81C1C]", dotColor: "bg-[#E81C1C]" },
    canceledNotSelected: {bg: "bg-transparent", text: "text-black", border: "border-2 border-[#EBEBEB]", dotColor: "bg-[#E81C1C]" },
    
    noShow: { bg: "bg-[#F0E7FD]", text: "text-[#6011D0]", dotColor: "bg-[#6011D0]" },
    noShowSelected: { bg: "bg-[#F0E7FD]", text: "text-[#6011D0]", dotColor: "bg-[#6011D0]" },
    noShowNotSelected: {bg: "bg-transparent", text: "text-black", border: "border-2 border-[#EBEBEB]", dotColor: "bg-[#6011D0]" },
}

interface IStatusBadgeProps {
    variant: BadgeVariant
    label: string
    className?: string
    isSelected?: boolean
    dot?: boolean
}

const StatusBadge: FunctionComponent<IStatusBadgeProps> = ({ variant, label, className, dot }) => {

    const { bg, text, border, dotColor } = variantStyles[variant]

    return (
        <Badge
            className={`p-1 max-w-[150px] w-full font-medium rounded-full items-center flex ${dot && "justify-start px-2"} ${border} ${bg} ${text} ${className}`}
        >
            {dot && <div className={`h-2 w-2 rounded-full ${dotColor}`}></div> }{ label }
        </Badge>
    )
}

export default StatusBadge
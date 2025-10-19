import type { FunctionComponent } from "react"

import { Calendar, Clock, Download } from "lucide-react"

import StatusBadge from "@/components/shared/buttons/BookingStatusBadges"
import { TableCell, TableRow } from "@/components/ui/table"
import { t } from "i18next"

interface iPaymentsHistoryItemProps {
    id: number
    date: string
    time: string
    plan: string
    price: number
    paymentMethod: string
    status: string
    statusLabel?: string
}

const PaymentsHistoryItem: FunctionComponent<iPaymentsHistoryItemProps> = ({ id, date, time, plan, price, paymentMethod, status, statusLabel }) => {
    return (
        <TableRow key={id} className="py-3">
            <TableCell className="flex flex-col gap-2 w-[200px]">
                <p className="flex items-center gap-1 font-medium"><Calendar size={20} color="#6C6C6C" strokeWidth={2} /> {date}</p>
                <p className="flex items-center gap-1 font-normal text-[#6C6C6C]"><Clock size={20} color="#6C6C6C" strokeWidth={2} /> {time}</p>
            </TableCell>

            <TableCell className="font-normal w-[180px]">{plan}</TableCell>
            
            <TableCell className="font-normal w-[180px]">{price}₾</TableCell>
            
            <TableCell className="font-normal w-[260px]">Card {'**** **** **** ' + paymentMethod.split(' ')[3]}</TableCell>
            
            <TableCell className="w-[220px]">
                <StatusBadge label={statusLabel ? statusLabel : '' } variant={status == 'completed' ? 'completed' : 'canceled'} />
            </TableCell>
            
            <TableCell className="w-[220px]">
                <a href="#" download className="flex items-center justify-center border-2 rounded-sm p-3 gap-1">
                    <Download size={15} /> { t("bookings.button.download") }
                </a>
            </TableCell>
        </TableRow>
    )
}

export default PaymentsHistoryItem
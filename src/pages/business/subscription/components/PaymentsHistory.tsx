import type { FunctionComponent } from "react"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import PaymentsHistoryItem from "./PaymentsHistoryItem"
import { t } from "i18next"

const PaymentsHistory: FunctionComponent = () => {

    const payments = [
        {
            "id": 1,
            "date": "2025-08-01",
            "time": "14:30",
            "plan": "fixed",
            "price": 150,
            "paymentMethod": "5555 2222 3333 4444",
            "status": "completed"
        },
        {
            "id": 2,
            "date": "2025-08-02",
            "time": "10:15",
            "plan": "fixed",
            "price": 150,
            "paymentMethod": "5555 2222 3333 4444",
            "status": "cancelled"
        },
        {
            "id": 3,
            "date": "2025-08-02",
            "time": "16:45",
            "plan": "fixed",
            "price": 150,
            "paymentMethod": "5555 2222 3333 4444",
            "status": "completed"
        },
        {
            "id": 4,
            "date": "2025-08-03",
            "time": "09:00",
            "plan": "fixed",
            "price": 150,
            "paymentMethod": "5555 2222 3333 4444",
            "status": "completed"
        },
        {
            "id": 5,
            "date": "2025-08-03",
            "time": "13:20",
            "plan": "fixed",
            "price": 150,
            "paymentMethod": "5555 2222 3333 4444",
            "status": "cancelled"
        }
    ]

    return (
        <div className="payment_history border-2 p-6 flex flex-col gap-3 rounded-sm">
            <div className="payment_history-title text-lg font-semibold">
                { t("subscription.tab.paymentHistory") }
            </div>
            <div className="payment_history-table">
                <Table>
                    <TableHeader>
                        <TableRow className="py-3">
                            <TableHead className="font-medium text-[#6C6C6C]">{ t("bookings.table.date&time") }</TableHead>
                            <TableHead className="font-medium text-[#6C6C6C]">{ t("bookings.table.plan") }</TableHead>
                            <TableHead className="font-medium text-[#6C6C6C]">{ t("bookings.table.pay") }</TableHead>
                            <TableHead className="font-medium text-[#6C6C6C]">{ t("bookings.table.payMethod") }</TableHead>
                            <TableHead className="font-medium text-[#6C6C6C]">{ t("bookings.table.status") }</TableHead>
                            <TableHead className="font-medium text-[#6C6C6C]">{ t("bookings.table.invoice") }</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.map((payment) => (
                            <PaymentsHistoryItem
                                key={payment.id}
                                id={payment.id}
                                date={payment.date}
                                time={payment.time}
                                plan={t(`subscription.plan.${payment.plan}`).split(' ')[0]}
                                price={payment.price}
                                paymentMethod={payment.paymentMethod}
                                status={payment.status}
                                statusLabel={t(`bookings.statusOptions.${payment.status}`)}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default PaymentsHistory

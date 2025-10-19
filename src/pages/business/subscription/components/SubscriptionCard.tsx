import type { FunctionComponent } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Check } from "lucide-react"
import { t } from "i18next"

interface ISubscriptionCards {
    title: string
    price: number
    priceOption: string
    description: string
    options: string[]
}

const SubscriptionCard: FunctionComponent = () => {

    const subscriptionCards: ISubscriptionCards[] = [
        {
            title: t("subscription.plan.fixed"),
            price: 150,
            priceOption: t("subscription.plan.fixed.payMethod"),
            description: 'Unlimited bookings, full CRM access, reminders and analytics',
            options: ["Unlimited bookings", "Full CRM access", "Priority support", "Booking dashboard", "Notifications", "Automated reminders", "Calendar sync", "Review & analytics", "Staff & table management"]
        },
        {
            title: t("subscription.plan.perPay"),
            price: 2.50,
            priceOption: t("subscription.plan.perPay.payMethod"),
            description: 'No monthly commitment. Only pay when your business gets booked',
            options: ["No monthly fees", "Pay only for success", "Perfect for new businesses", "Booking dashboard", "Notifications", "Automated reminders", "Calendar sync", "Review & analytics", "Staff & table management"]
        },
    ]

    return (
        <div className="flex flex-col lg:flex-row gap-6 items-center lgnpm :items-start md:justify-center">
         {subscriptionCards.map((card, index) => (
            <Card
                key={index}
                className="max-w-[460px] w-full rounded-md shadow-none border-2 py-6 flex flex-col gap-4"
            >
                <CardHeader className="flex flex-col gap-4 w-full">
                    <CardTitle className="text-xl font-bold">
                        {card.title}
                    </CardTitle>
                    <div className="price">
                        <span className="text-4xl font-semibold">₾{card.price}</span>
                        <span className="text-base font-normal text-[#6C6C6C]">/{card.priceOption}</span>
                        </div>
                    <CardTitle className="text-base font-normal text-[#6C6C6C]">{card.description}</CardTitle>
                    <div className="check border-2 border-[#EF7800] p-3 text-center font-medium rounded-md cursor-pointer w-full">{ t("subscription.activePlan") }</div>
                </CardHeader>
                <CardContent>
                    <ul className="flex flex-col gap-3">
                        {card.options.map((option, index) => (
                            <li key={index} className="flex items-center gap-2 font-normal">
                                <Check color="#21C55D" size={18} /> {option}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
         ))}   
        </div>
    )
}

export default SubscriptionCard

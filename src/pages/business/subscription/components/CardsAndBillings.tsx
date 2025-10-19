import type { FunctionComponent } from "react"

import CurrentPlanInfo from "./CurrentPlanInfo"
import SavedPaymentMethod from "./SavedPaymentMethod"

interface ICardInfo {
    id: number,
    type: string,
    cardNumber: string
    expiresAt: string
    firstName: string
    lastName: string
}

interface ICurrentPlan {
    id: number
    plan: string
    price: number,
    getAt: string
    expiresAt: string
}

const CardsAndBillings: FunctionComponent = () => {

    const cardInfo: ICardInfo = {
        id: 1,
        type: 'visa',
        cardNumber: "1111 2222 3333 4444",
        expiresAt: '12/25',
        firstName: 'John',
        lastName: "Doe"
    }

    const currentPlan: ICurrentPlan = {
        id: 1,
        plan: "Fixed Price Per Month",
        price: 150,
        getAt: '2025-06-11',
        expiresAt: '2025-07-11'
    }

    return (
        <div className="flex flex-col gap-6">
            <CurrentPlanInfo currentPlan={currentPlan} />
            <SavedPaymentMethod cardInfo={cardInfo} />
        </div>
    )
}

export default CardsAndBillings
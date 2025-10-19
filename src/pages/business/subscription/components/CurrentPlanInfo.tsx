import type { FunctionComponent } from "react"

import CustomSwitch from "@/components/shared/customSwitch"
import { t } from "i18next"

interface CurrentPlanInfo {
    id: number
    plan: string
    price: number
    getAt: string
    expiresAt: string
}

interface ICurrentPlanInfoProps {
    currentPlan: CurrentPlanInfo
}

const CurrentPlanInfo: FunctionComponent<ICurrentPlanInfoProps> = ({ currentPlan }) => {
    return (
        <div className="current_plan-info flex flex-col gap-4 border-2 rounded-md p-6">
            <div className="current_plan-title text-lg font-semibold">
                { t("subscription.cardAndPayment.currentPlan") }
            </div>
            <div className="current_plan-payment_info flex justify-between">
                <div className="payment_info-left">
                    <div className="payment_info-title font-medium">
                        { t(`subscription.plan.${currentPlan.plan.split(' ')[0].toLowerCase()}`) }
                    </div>
                    <div className="payment_info-price font-normal text-[#6C6C6C]">
                        { t("subscription.cardAndPayment.currentPlanPrice", { price: currentPlan.price }) }
                    </div>
                </div>
                <div className="payment_info-right flex flex-col items-end">
                    <div className="payment_info-title font-medium">
                        { t("subscription.cardAndPayment.paymentDate") }
                    </div>
                    <div className="payment_info-date font-normal text-[#6C6C6C]">
                        {/* 1st July, 2025 */}
                        {new Date(currentPlan.expiresAt).toLocaleDateString()}
                    </div>
                </div>
            </div>

            <div className="line h-[1px] bg-[#EBEBEB]"></div>

            <div className="auto_renewal flex items-center justify-between">
                <div className="auto_renewal-left">
                    <div className="auto_renewal-title font-medium">
                        { t("subscription.cardAndPayment.autoRenewal") }
                    </div>
                    <div className="auto_renewal-desc font-normal text-[#6C6C6C]">
                        {t("subscription.cardAndPayment.autoPaymentInfo", { date: new Date(currentPlan.getAt).getDate() })}
                    </div>
                </div>
                <div className="auto-renewal-left">
                    <CustomSwitch />
                </div>
            </div>

        </div>
    )
}

export default CurrentPlanInfo

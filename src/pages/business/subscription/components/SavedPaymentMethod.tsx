import type { FunctionComponent } from "react"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"

import { Pencil, Plus, Trash2 } from "lucide-react"
import { t } from "i18next"

interface ICardInfo {
    id: number,
    type: string,
    cardNumber: string
    expiresAt: string
    firstName: string
    lastName: string
}

interface ISavedPaymentMethodProps {
    cardInfo?: ICardInfo
}

const SavedPaymentMethod: FunctionComponent<ISavedPaymentMethodProps> = ({ cardInfo }) => {
    return (
        <div className="saved_payment_method flex flex-col gap-4 border-2 rounded-md p-6">
            <div className="saved_payment_method-title text-lg font-semibold">
                { t("subscription.cardAndPayment.savedPayMethod") }
            </div>
            
            { cardInfo ? (
                <>
                    <div className="saved_payment_method-card flex justify-between">
                        <div className="saved_payment_method-card-info flex items-center gap-3">
                            <div className="card_info-type bg-[#3B81F6] font-bold text-white p-1.5 rounded-md uppercase">
                                { cardInfo.type }
                            </div>
                            <div className="card_info-data">
                                <p className="font-medium">{ '**** **** **** '+ cardInfo.cardNumber.split(' ')[3] }</p>
                                <p className="font-normal text-[#6C6C6C]">Expires { cardInfo.expiresAt }</p>
                            </div>
                        </div>
                        <div className="saved_payment_method-card-btns flex items-center gap-3">
                            <SecondaryButton icon={<Pencil size={20} />}>{ t("bookings.actionButtons.edit") }</SecondaryButton>
                            <SecondaryButton icon={<Trash2 size={20} />} className="text-[#E81C1C]">{ t("bookings.actionButtons.delete") }</SecondaryButton>
                        </div>
                    </div>

                    <div className="line h-[1px] bg-[#EBEBEB]"></div>

                    <div className="add_card flex flex-col gap-4">
                        <div className="card_owner">
                            <p className="font-medium">{ t("subscription.cardAndPayment.savedPayMethod.owner") }</p>
                            <p className="font-normal text-[#6C6C6C]">{ cardInfo.firstName } { cardInfo.lastName }</p>
                        </div>
                    </div>
                </>
            ) : (
                <div className="font-bold text-2xl text-center">
                    { t("subscription.cardAndPayment.savedPayMethod.noCardInfo") }
                </div>
            )}

            <div className="add_card-btn flex justify-end">
                <PrimaryButton
                    className="w-max"
                >
                    {<Plus size={20} strokeWidth={3} />} { t("bookings.button.addPaymentCard") }
                </PrimaryButton>
            </div>

        </div>
    )
}

export default SavedPaymentMethod
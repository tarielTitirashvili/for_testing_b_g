import type { FunctionComponent } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Calendar, FileText, MousePointer, Star } from "lucide-react"
import { useTranslation } from "react-i18next"

interface IClicksInfoProps {
    menuClicks: number,
    menuClicksPercent: number
    ratingClicks: number
    ratingClicksPercent: number
    bookingClicks: number
    bookingClicksPercent: number
}

const ClicksInfo: FunctionComponent<IClicksInfoProps> = ({ menuClicks, menuClicksPercent, ratingClicks, ratingClicksPercent, bookingClicks, bookingClicksPercent }) => {
    
    const { t } = useTranslation()
    
    return (
        <Card className="max-w-[370px] w-full shadow-none rounded-sm flex flex-col justify-between">
            <CardHeader className="flex items-center justify-between w-full">
                <CardTitle className="text-lg font-semibold">
                    {t('dashboard.cardTitle.amountClicks')}
                </CardTitle>
                <CardDescription>
                    <MousePointer
                        size={30}
                        strokeWidth={2}
                        color="#2369DC"
                        className="bg-[#ECF3FF] p-1.5 rounded-sm" />
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <div className="card_item flex flex-col items-center justify-between h-[135px] w-[110px] text-center">
                    <div className="card_item-icon">
                        <FileText color="#3B81F6" size={30} />
                    </div>
                    <div className="clicks-cnt-info text-2xl font-bold">
                        { menuClicks }
                    </div>
                    <div className="clicks-desc text-[#6C6C6C] text-xs font-medium">
                        { t("dashboard.card.menuClicksCnt") }
                    </div>
                    <div className="clicks-percentage font-medium text-[#21C55D]">
                        +{ menuClicksPercent }%
                    </div>
                </div>
                <div className="card_item flex flex-col items-center justify-between h-[135px] w-[110px] text-center">
                    <div className="card_item-icon">
                        <Star color="#3B81F6" size={30} />
                    </div>
                    <div className="clicks-cnt-info text-2xl font-bold">
                        { ratingClicks }
                    </div>
                    <div className="clicks-desc text-[#6C6C6C] text-xs font-medium">
                        { t("dashboard.card.menuClicksCnt") }
                    </div>
                    <div className="clicks-percentage font-medium text-[#21C55D]">
                        +{ ratingClicksPercent }%
                    </div>
                </div>
                <div className="card_item flex flex-col items-center justify-between h-[135px] w-[110px] text-center">
                    <div className="card_item-icon">
                        <Calendar color="#3B81F6" size={30} />
                    </div>
                    <div className="clicks-cnt-info text-2xl font-bold">
                        { bookingClicks }
                    </div>
                    <div className="clicks-desc text-[#6C6C6C] text-xs font-medium">
                        { t("dashboard.card.menuClicksCnt") }
                    </div>
                    <div className="clicks-percentage font-medium text-[#21C55D]">
                        +{ bookingClicksPercent }%
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ClicksInfo
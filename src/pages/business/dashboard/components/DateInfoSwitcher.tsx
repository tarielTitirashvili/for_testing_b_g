import type { FunctionComponent } from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "react-i18next"

interface IPeriods {
    period: string
    days: string
    value: string
}

const DateInfoSwitcher: FunctionComponent = () => {

    const { t } = useTranslation()

    const periods: IPeriods[] = [
        {
            period: t('calendar.text.day'),
            days: '1',
            value: 'oneDay'
        },
        {
            period: t('calendar.text.week'),
            days: '7',
            value: 'oneWeek'
        },
        {
            period: t('calendar.text.month'),
            days: '30',
            value: 'oneMonth'
        },
        {
            period: t('calendar.text.year'),
            days: '365',
            value: 'oneYear'
        }
    ]

    return (
        <Tabs defaultValue="oneDay">
            <TabsList className="bg-white w-full h-min py-1.5 px-1.5 sm:gap-2">
                {periods.map(period => (
                    <TabsTrigger 
                        key={+period.days}
                        className="data-[state=active]:bg-[#EF7800] data-[state=active]:text-[white] data-[state=active]:font-medium text-[#6C6C6C] py-2 px-4 text-xs sm:text-sm font-normal capitalize"
                        value={period.value}
                    >
                        1 {period.period}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}

export default DateInfoSwitcher
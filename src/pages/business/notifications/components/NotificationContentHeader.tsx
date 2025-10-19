import StatusBadge from "@/components/shared/buttons/BookingStatusBadges"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { t } from "i18next"
import type { FunctionComponent } from "react"

interface INotification {
    id: number
    title: string
    user_firstName: string
    user_lastName: string
    action: string
    service: string
    book_date: string
    notification_date: string
    status: 'read' | 'unread'
}

interface INotificationContentHeaderProps {
    notifications: INotification[]
}

const NotificationContentHeader: FunctionComponent<INotificationContentHeaderProps> = ({ notifications }) => {
    return (
        <div className="notification_content-header flex items-center justify-between">
            <div className="notification_content-header-left flex items-center gap-3">
                <div className="total_count font-semibold text-lg">
                    {t("notification.header.activities")}({ notifications.length })
                </div>
                <TabsList className="h-[50px] bg-transparent flex flex-row justify-center lg:w-max">
                    <TabsTrigger value="all" className="px-3 data-[state=active]:text-[#AE5700] data-[state=active]:bg-[#FEF2E6] data-[state=active]:shadow-none">
                        { t("notification.button.all") }
                    </TabsTrigger>
                    <TabsTrigger value="books" className="px-3 data-[state=active]:text-[#AE5700] data-[state=active]:bg-[#FEF2E6] data-[state=active]:shadow-none">
                        { t("notification.button.bookings") }
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="px-3 data-[state=active]:text-[#AE5700] data-[state=active]:bg-[#FEF2E6] data-[state=active]:shadow-none">
                        { t("notification.button.reviews") }
                    </TabsTrigger>
                </TabsList>
            </div>
            <div className="notification_content-header-right w-max">
                <StatusBadge label={`${notifications.filter((notification) => notification.status === 'unread').length.toString()} ${ t("notification.badge.unread") }`} variant="canceled" className="bg-red-600 text-white w-min flex-1 px-4 py-2" />
            </div>
        </div>
    )
}

export default NotificationContentHeader

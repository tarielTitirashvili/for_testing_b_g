import { useState, type FunctionComponent } from "react"

import { useGetNotificationsQuery } from "@/redux/business/notification/notificationAPISlice";

import { Tabs } from "@/components/ui/tabs"

import NotificationsList from "./components/NotificationsList";
import NotificationContentHeader from "./components/NotificationContentHeader";

export interface INotification {
    businessId: string
    message: string
    orderId: number
    type: number
    typeName: string
}

const Notifications: FunctionComponent = () => {

    // wss://bookitcrm.runasp.net/notificationsHub

    const [tab, setTab] = useState<string>('all')

    const {data: notifications = []} = useGetNotificationsQuery(undefined, {
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false,
    })

    const filterNotification = (notificationType: string) => {
        if (notificationType == 'all') return notifications

        return notifications.filter(notification => notification.typeName === notificationType)
    }

    const handleTab = (value: string) => {
        setTab(value)
    }

    const filtered = filterNotification(tab)


    return (
        <div className="notifications_wrapper flex flex-col gap-6 bg-white px-6 pt-5 pb-6 rounded-md">

            <div className="notifications_content-wrapper">
                <Tabs className="notification_content" defaultValue="all" value={tab} onValueChange={handleTab}>

                    <NotificationContentHeader notifications={filtered} />

                    <NotificationsList notifications={filtered} />

                </Tabs>
            </div>


        </div>
    )
}

export default Notifications
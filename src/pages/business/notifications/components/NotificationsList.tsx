import type { FunctionComponent } from "react"

import { TabsContent } from "@/components/ui/tabs"
import type { INotification } from "../Notifications"

import NotificationListItem from "./NotificationListItem"
import EmptyResponse from "@/components/shared/emptyResponse"

interface INotificationsListProps {
    notifications: INotification[]
}

const NotificationsList: FunctionComponent<INotificationsListProps> = ({ notifications }) => {

    return (
        <div className="notification_content-main flex flex-col gap-3">
            {notifications.length > 0 ? (
                <>
                    <TabsContent value="all" className="flex flex-col gap-3">
                        { notifications.map((notification) => (
                            <NotificationListItem
                                key={notification.orderId}
                                notification={notification}
                            />
                        )) }
                    </TabsContent>
                    <TabsContent value="CreateOrder" className="flex flex-col gap-3">
                        { notifications.map((notification) => (
                            <NotificationListItem
                                key={notification.orderId}
                                notification={notification}
                            />
                        )) }
                    </TabsContent>
                    <TabsContent value="reviews" className="flex flex-col gap-3">
                        { notifications.map((notification) => (
                            <NotificationListItem
                                key={notification.orderId}
                                notification={notification}
                            />
                        )) }
                    </TabsContent>
                </>
            ) : (
                <EmptyResponse />
            )}
        </div>
    )
}

export default NotificationsList
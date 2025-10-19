import type { FunctionComponent } from "react"
import NotificationListItem from "./NotificationListItem"
import { TabsContent } from "@/components/ui/tabs"

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
    type: 'booking' | 'review'
}

interface INotificationsListProps {
    notifications: INotification[]
}

const NotificationsList: FunctionComponent<INotificationsListProps> = ({ notifications }) => {

    return (
        <div className="notification_content-main flex flex-col gap-3">
            <TabsContent value="all" className="flex flex-col gap-3">
                { notifications.map((notification) => (
                    <NotificationListItem
                        key={notification.id}
                        id={notification.id}
                        user_firstName={notification.user_firstName}
                        user_lastName={notification.user_lastName}
                        title={notification.title}
                        action={notification.action}
                        service={notification.service}
                        book_date={notification.book_date}
                        notification_date={notification.notification_date}
                        status={notification.status}
                        
                    />
                )) }
            </TabsContent>
            <TabsContent value="books" className="flex flex-col gap-3">
                { notifications.filter(notification => notification.type === 'booking').map(notification => (
                    <NotificationListItem
                        key={notification.id}
                        id={notification.id}
                        user_firstName={notification.user_firstName}
                        user_lastName={notification.user_lastName}
                        title={notification.title}
                        action={notification.action}
                        service={notification.service}
                        book_date={notification.book_date}
                        notification_date={notification.notification_date}
                        status={notification.status}
                        
                    />
                ))}
            </TabsContent>
            <TabsContent value="reviews" className="flex flex-col gap-3">
                { notifications.filter(notification => notification.type === 'review').map(notification => (
                    <NotificationListItem
                        key={notification.id}
                        id={notification.id}
                        user_firstName={notification.user_firstName}
                        user_lastName={notification.user_lastName}
                        title={notification.title}
                        action={notification.action}
                        service={notification.service}
                        book_date={notification.book_date}
                        notification_date={notification.notification_date}
                        status={notification.status}
                        
                    />
                ))}
            </TabsContent>
        </div>
    )
}

export default NotificationsList
import { Tabs } from "@/components/ui/tabs"
import type { FunctionComponent } from "react"
import NotificationHeader from "./components/NotificationHeader"
import NotificationContentHeader from "./components/NotificationContentHeader"
import NotificationsList from "./components/NotificationsList"

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

const Notifications: FunctionComponent = () => {

    const notifications: INotification[] = [
        {
            id: 1,
            title: "New Booking",
            user_firstName: "John",
            user_lastName: "Doe",
            action: "booked",
            service: "Haircut",
            book_date: "2025-09-01T10:00:00Z",
            notification_date: "2025-08-25T14:30:00Z",
            status: "unread",
            type: 'booking'
        },
        {
            id: 2,
            title: "Booking Canceled",
            user_firstName: "Anna",
            user_lastName: "Smith",
            action: "canceled",
            service: "Massage",
            book_date: "2025-09-03T12:00:00Z",
            notification_date: "2025-08-25T15:00:00Z",
            status: "read",
            type: 'booking'
        },
        {
            id: 3,
            title: "Booking Rescheduled",
            user_firstName: "Michael",
            user_lastName: "Brown",
            action: "rescheduled",
            service: "Dentist Appointment",
            book_date: "2025-09-05T09:00:00Z",
            notification_date: "2025-08-25T16:10:00Z",
            status: "unread",
            type: 'review'
        },
        {
            id: 4,
            title: "New Review",
            user_firstName: "Emily",
            user_lastName: "Johnson",
            action: "left a review",
            service: "Yoga Class",
            book_date: "2025-08-20T08:00:00Z",
            notification_date: "2025-08-25T17:00:00Z",
            status: "read",
            type: 'booking'
        },
        {
            id: 5,
            title: "New Booking",
            user_firstName: "David",
            user_lastName: "Wilson",
            action: "booked",
            service: "Car Wash",
            book_date: "2025-09-02T14:00:00Z",
            notification_date: "2025-08-25T18:20:00Z",
            status: "unread",
            type: 'booking'
        },
        {
            id: 6,
            title: "Booking Canceled",
            user_firstName: "Sophia",
            user_lastName: "Taylor",
            action: "canceled",
            service: "Therapy Session",
            book_date: "2025-09-06T11:00:00Z",
            notification_date: "2025-08-25T19:00:00Z",
            status: "read",
            type: 'booking'
        },
        {
            id: 7,
            title: "Booking Rescheduled",
            user_firstName: "James",
            user_lastName: "Miller",
            action: "rescheduled",
            service: "Fitness Training",
            book_date: "2025-09-07T07:30:00Z",
            notification_date: "2025-08-25T20:15:00Z",
            status: "unread",
            type: 'review'
        },
        {
            id: 8,
            title: "New Review",
            user_firstName: "Olivia",
            user_lastName: "Davis",
            action: "left a review",
            service: "Cooking Class",
            book_date: "2025-08-18T15:00:00Z",
            notification_date: "2025-08-25T21:00:00Z",
            status: "read",
            type: 'booking'
        },
        {
            id: 9,
            title: "New Booking",
            user_firstName: "Ethan",
            user_lastName: "Martinez",
            action: "booked",
            service: "Photography Session",
            book_date: "2025-09-04T13:00:00Z",
            notification_date: "2025-08-25T22:30:00Z",
            status: "unread",
            type: 'review'
        },
        {
            id: 10,
            title: "Booking Canceled",
            user_firstName: "Isabella",
            user_lastName: "Garcia",
            action: "canceled",
            service: "Dog Grooming",
            book_date: "2025-09-08T16:00:00Z",
            notification_date: "2025-08-25T23:15:00Z",
            status: "read",
            type: 'review'
        }
    ]

    return (
        <div className="notifications_wrapper flex flex-col gap-6">
            <NotificationHeader />

            <div className="notifications_content-wrapper bg-white px-6 pt-5 pb-6 rounded-md">
                <Tabs className="notification_content" defaultValue="all">

                    <NotificationContentHeader notifications={notifications} />

                    <NotificationsList notifications={notifications} />

                </Tabs>
            </div>


        </div>
    )
}

export default Notifications

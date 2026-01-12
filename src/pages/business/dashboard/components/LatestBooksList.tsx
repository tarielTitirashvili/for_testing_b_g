import type { FunctionComponent } from "react"

import LatestBookItem from "./LatestBookItem"

import { Link } from "react-router-dom"

import { t } from "i18next"

interface ILatestBookItemProps {
    firstName: string
    lastName: string
    service: string
    date: string
    time: string
    status: string
    statusLabel: string
}

const LatestBooksList: FunctionComponent = () => {


    const lastBooks: ILatestBookItemProps[] = [
        {
            "firstName": "Alice",
            "lastName": "Johnson",
            "service": "Haircut",
            "date": "2025-08-01",
            "time": "10:00",
            "status": "completed",
            'statusLabel': t("bookings.statusOptions.confirmed")
        },
        {
            "firstName": "Brian",
            "lastName": "Smith",
            "service": "Massage",
            "date": "2025-08-02",
            "time": "14:30",
            "status": "canceled",
            'statusLabel': t("bookings.statusOptions.cancelled")
        },
        {
            "firstName": "Carla",
            "lastName": "Davis",
            "service": "Facial",
            "date": "2025-08-03",
            "time": "09:00",
            "status": "completed",
            'statusLabel': t("bookings.statusOptions.confirmed") 
        },
        {
            "firstName": "David",
            "lastName": "Lee",
            "service": "Manicure",
            "date": "2025-08-04",
            "time": "16:15",
            "status": "canceled",
            'statusLabel': t("bookings.statusOptions.cancelled")
        }
    ]

    return (
        <div className="flex flex-col gap-4">
            <div className="latest_books-header flex items-center justify-between">
                <div className="latest_books-header_title text-lg font-semibold">
                    { t("dashboard.latestBooks.title") }
                </div>
                <div className="latest_books-header-link">
                    <Link to={'/books'} className="p-3 text-button-color font-medium text-sm">
                        { t("dashboard.latestBooks.seeAll") }
                    </Link>
                </div>
            </div>
            <div className="latest_books-list flex flex-col gap-3 overflow-auto">
                {lastBooks.map((book, index) => (
                    <LatestBookItem
                        key={index}
                        firstName={ book.firstName }
                        lastName={ book.lastName }
                        service={ book.service }
                        date={ book.date }
                        time={ book.time }
                        status={ book.status }
                        statusLabel={book.statusLabel}
                    />
                ))}
            </div>
        </div>
    )
}

export default LatestBooksList
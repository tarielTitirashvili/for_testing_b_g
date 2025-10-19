import StatusBadge from '@/components/shared/buttons/BookingStatusBadges'
import CustomCheckbox from '@/components/shared/customCheckbox'
import { t } from 'i18next'
import { Clock } from 'lucide-react'
import { useState, type FunctionComponent } from 'react'

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

const NotificationListItem: FunctionComponent <INotification>= ({ id, title, user_firstName, user_lastName, action, book_date, notification_date, service, status }) => {

    const [checked, setChecked] = useState<boolean>(false)

    return (
        <div className={`item flex justify-between items-center p-6 rounded-md border-2 transition-all duration-200 ${checked ? 'border-[#FEF2E6] bg-[#FEF2E6]' : 'border-[#EBEBEB]'}`}>
            <div className="item_content-group flex items-start gap-3">
                <div className="checkbox">
                    <CustomCheckbox checked={checked} clickChecked={() => setChecked(prev => !prev)} id={ String(id) } />
                </div>
                <div className="item_content flex flex-col gap-2">
                    <div className="content_title font-medium">
                        { title }
                    </div>
                    <div className="content_text font-normal text-sm text-[#6C6C6C]">
                        { user_firstName } { user_lastName.slice(0, 1) }. { action } "{ service }" for { new Date(book_date).toLocaleDateString() }
                    </div>
                    <div className="content_date font-medium text-xs flex gap-1 text-[#6C6C6C]">
                        <Clock size={15} /> { new Date(notification_date).toLocaleDateString() }
                    </div>
                </div>
            </div>
            <div className="status">
                <StatusBadge className="px-4 py-2" label={t(`notification.badge.${status}`)} variant={ status === 'read' ? 'confirmedSolid' : 'pendingSolid' } />
            </div>
        </div>
    )
}

export default NotificationListItem

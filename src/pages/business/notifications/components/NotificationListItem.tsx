import { type FunctionComponent } from 'react'

import { t } from 'i18next'

import { Clock } from 'lucide-react'

import type { INotification } from '../Notifications'

import StatusBadge from '@/components/shared/buttons/BookingStatusBadges'

interface INotificationListItemProps {
    notification: INotification
}

const NotificationListItem: FunctionComponent <INotificationListItemProps>= ({ notification }) => {
    return (
        <div className={`item flex justify-between items-center p-6 rounded-md border-2 transition-all duration-200 ${notification.type == 6 ? 'border-[#FEF2E6] bg-[#FEF2E6]' : 'border-[#EBEBEB]'}`}>
            <div className="item_content-group flex items-start gap-3">
                <div className="item_content flex flex-col gap-2">
                    <div className="content_title font-medium">
                        ახალი შეტყობინება
                    </div>
                    <div className="content_text font-normal text-sm text-[#6C6C6C]">
                        { notification.message }, ჯავშნის აიდი: { notification.orderId }
                    </div>
                    <div className="content_date font-medium text-xs flex gap-1 text-[#6C6C6C]">
                        <Clock size={15} /> { new Date().toLocaleDateString() }
                    </div>
                </div>
            </div>
            <div className="status">
                <StatusBadge className="px-4 py-2" label={t(`${notification.type === 6 ? 'notification.badge.unread' : 'notification.badge.read'}`)} variant={ notification.type === 6 ? 'pendingSolid' : 'confirmedSolid' } />
            </div>
        </div>
    )
}

export default NotificationListItem
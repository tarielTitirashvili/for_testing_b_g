import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetNotificationsQuery } from "@/redux/business/notification/notificationAPISlice"
import { Bell, Clock } from "lucide-react"
import { useEffect, useRef, useState, type FunctionComponent } from "react"
import { Separator } from "@radix-ui/react-separator"
import PrimaryButton from "../buttons/PrimaryButton"
import { useTranslation } from 'react-i18next'

const NotificationDropDown: FunctionComponent = () => {

    const [open, setOpen] = useState<boolean>(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const {t} = useTranslation()
    
    const { data: notifications = [] } = useGetNotificationsQuery(undefined, {
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false,
    })
    useEffect(() => {
        const handelOutslideClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false)
        }

        document.addEventListener('mousedown', handelOutslideClick)

        return () => document.removeEventListener('mousedown', handelOutslideClick)
    }, [])

    return (
        <div ref={wrapperRef}>
            <Bell onClick={() => setOpen(prev => !prev)} size={40} className="flex items-center gap-4 cursor-pointer max-w-max w-full p-2 rounded-xl" />

            {open && (
                <div className="absolute top-[110%] min-w-full right-0">
                    <Card className="w-full left-0 h-auto rounded-md shadow-none p-3 py-4 border-2 gap-3 relative flex flex-col bg-white z-[1]">
                        <CardHeader className="text-left p-0">
                            <CardTitle>{t('sidebar.link.notifications')}</CardTitle>
                            <CardDescription className="hidden" />
                        </CardHeader>

                        <Separator className="border" />
                        
                        <div className="notification_card-body flex flex-col gap-4">
                            {notifications.map(notification => (
                                <div className={`item flex justify-between items-center p-2 rounded-md border-2 transition-all duration-200 border-[#FEF2E6] bg-[#FEF2E6]`}>
                                    <div className="item_content-group flex items-start gap-3">
                                        <div className="item_content flex flex-col gap-2">
                                            <div className="content_title font-medium">
                                                {t('sidebar.link.newNotifications')}
                                            </div>
                                            <div className="content_text font-normal text-sm text-[#6C6C6C]">
                                                {notification.message}, {t('sidebar.link.newNotification.bookingId')} {notification.orderId}
                                            </div>
                                            <div className="content_date font-medium text-xs flex gap-1 text-[#6C6C6C]">
                                                <Clock size={15} /> { new Date().toLocaleDateString() }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {notifications.length == 0 && (
                                <p className="text-sm text-[#6C6C6C] font-medium">{t('sidebar.link.newNotification.noNewNotifications')}</p>
                            )}
                        </div>
                        <Separator className="border" />
                        <CardFooter className="flex gap-2">
                            <button className="flex-1 text-xs font-medium text-[#EF7800] cursor-pointer">{t('sidebar.link.newNotification.allRead')}</button>
                            <PrimaryButton className="flex-1 cursor-pointer">{t('dashboard.latestBooks.seeAll')}</PrimaryButton>
                        </CardFooter>
                    </Card>
                </div>
            )}

        </div>
    )
}

export default NotificationDropDown
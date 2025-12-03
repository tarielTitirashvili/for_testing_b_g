import type { FunctionComponent } from "react"

import type { INotification } from "../Notifications"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { t } from "i18next"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Check, EllipsisVertical } from "lucide-react"

import CustomDropdown from "@/components/shared/buttons/CustomDropdown"

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
                    <TabsTrigger value="CreateOrder" className="px-3 data-[state=active]:text-[#AE5700] data-[state=active]:bg-[#FEF2E6] data-[state=active]:shadow-none">
                        { t("notification.button.bookings") }
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="px-3 data-[state=active]:text-[#AE5700] data-[state=active]:bg-[#FEF2E6] data-[state=active]:shadow-none">
                        { t("notification.button.reviews") }
                    </TabsTrigger>
                </TabsList>
            </div>
            <div className="notification_content-header-right w-max">
                <CustomDropdown
                    trigger={<EllipsisVertical />}
                >
                    <DropdownMenuItem>
                        <Check /> ყველას წაკითხულად მონიშვნა
                    </DropdownMenuItem>
                </CustomDropdown>
            </div>
        </div>
    )
}

export default NotificationContentHeader
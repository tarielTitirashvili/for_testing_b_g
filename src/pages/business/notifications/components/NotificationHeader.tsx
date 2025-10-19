import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import { t } from "i18next"
import { Check } from "lucide-react"
import type { FunctionComponent } from "react"
import ReminderSettingsButton from "./ReminderSettingsButton"

const NotificationHeader: FunctionComponent = () => {
    return (
        <div className="notifications_header flex justify-between">
            <ReminderSettingsButton />
            <SecondaryButton className="bg-white w-max">
                <Check /> { t('notification.button.checkAll') }
            </SecondaryButton>
        </div>
    )
}

export default NotificationHeader
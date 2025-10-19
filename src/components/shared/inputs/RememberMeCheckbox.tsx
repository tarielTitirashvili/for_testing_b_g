import type { FunctionComponent } from "react"
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";

const RememberMeCheckbox: FunctionComponent = () => {

    const { t } = useTranslation()

    return (
        <div className="form_terms flex items-center gap-1">
            <Checkbox />
            <p className="text-base font-medium">
                { t('bookings.inputLabel.rememberMe') }
            </p>
        </div>
    )
}

export default RememberMeCheckbox
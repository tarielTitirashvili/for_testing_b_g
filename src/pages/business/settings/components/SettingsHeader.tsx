import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { t } from "i18next"
import type { FunctionComponent } from "react"

const SettingsHeader: FunctionComponent = () => {
    return (
        <div className="settings_header flex flex-col items-center gap-4 text-lg font-semibold">
            <div className="settings_header-title">
                { t('settings.main.title') }
            </div>
            <TabsList className="w-full p-2 h-[50px]">
                <TabsTrigger className="p-1 cursor-pointer" value="main">{ t('settings.navigation.main') }</TabsTrigger>
                <TabsTrigger className="p-1 cursor-pointer" value="rights">{ t('settings.navigation.rolesAndRights') }</TabsTrigger>
            </TabsList>
        </div>
    )
}

export default SettingsHeader

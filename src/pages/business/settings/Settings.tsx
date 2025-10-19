import { Tabs } from "@/components/ui/tabs"
import { type FunctionComponent } from "react"
import SettingsHeader from "./components/SettingsHeader"
import SettingsBody from "./components/SettingsBody"

const Settings: FunctionComponent = () => {
    return (
        <div className="settings flex max-w-[1080px] w-full m-auto">
            <Tabs className="settings_wrapper bg-white border-2 border-[#EBEBEB] w-full p-5 rounded-md flex flex-col gap-5" defaultValue="rights">
                <SettingsHeader />
                <SettingsBody />
            </Tabs>
        </div>
    )
}

export default Settings
import { type FunctionComponent } from "react"

import MainSettings from "./MainSettings"
import RolesAndRights from "./RolesAndRights"

const SettingsBody: FunctionComponent = () => {

    return (
        <div className="settings_body_wrapper h-full">
            <MainSettings />
            <RolesAndRights />
        </div>
    )
}

export default SettingsBody
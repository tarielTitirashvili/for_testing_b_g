import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FunctionComponent } from "react"

const SettingsHeader: FunctionComponent = () => {
    return (
        <div className="settings_header flex flex-col items-center gap-4 text-lg font-semibold">
            <div className="settings_header-title">
                აკონტროლე შენი ანგარიშის პარამეტრები და მისი უფლებები
            </div>
            <TabsList className="w-full p-2 h-[50px]">
                <TabsTrigger className="p-1 cursor-pointer" value="main">main</TabsTrigger>
                <TabsTrigger className="p-1 cursor-pointer" value="rights">rights</TabsTrigger>
            </TabsList>
        </div>
    )
}

export default SettingsHeader

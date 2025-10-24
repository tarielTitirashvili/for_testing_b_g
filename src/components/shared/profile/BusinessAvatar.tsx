import type { FunctionComponent } from "react"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"
import type { IBusiness } from './Profile'

interface IProfileProps {
    handleProfileList: () => void
    business: IBusiness | null
}
const BusinessAvatar: FunctionComponent<IProfileProps> = ({ handleProfileList, business }) => {
    return (
        <div
            onClick={handleProfileList}
            className="avatar flex items-center gap-4 cursor-pointer max-w-max w-full hover:bg-[#F4F5F5] p-2 rounded-xl"
        >
            <div className="avatar_info hidden sm:block">
                <div className="avatar_info-business_name">
                    { business?.name }
                </div>
                <div className="avatar_info-business-type text-sm text-[#6C6C6C]">
                    {business?.businessCategory.name}
                </div>
            </div>
            <div className="avatar-icon flex items-center">
                <Avatar className="h-[50px] w-[50px] rounded-full p-1 bg-[#EF8700] flex items-center justify-center">
                    <AvatarImage src="/assets/images/avatar.svg" className="bg-transparent text-white h-4    w-4" />
                </Avatar>
                <div className="avatar-dropdown_btn p-1 w-full">
                    <ChevronDown size={24} />
                </div>
            </div>
        </div>
    )
}

export default BusinessAvatar
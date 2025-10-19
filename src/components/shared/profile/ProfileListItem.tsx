import { type FunctionComponent } from "react"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface IProfileListItemProps {
    businessName: string
    status: string
    accValue: string
    checked?: boolean
    handleSwitchProfile: ()=>void
}

const ProfileListItem: FunctionComponent<IProfileListItemProps> = ({businessName, status, accValue, checked, handleSwitchProfile}) => {
    return (
        <div onClick={handleSwitchProfile} className={`flex items-center justify-between px-2 py-3 cursor-pointer rounded-md border-2 ${checked ? ' bg-[#FEF2E6]' : 'hover:bg-[#ef870010]'}`}>
            <div className="avatar-info flex items-center gap-2">
                <Avatar className={`h-[45px] w-[45px] flex items-center justify-center ${checked ? 'bg-[#EF8700]' : 'bg-[#3B81F6]'}`}>
                    <AvatarImage src="/assets/images/avatar.svg" className="h-[15px]" />
                </Avatar>
                <div className="profile_list-account_info">
                    <p className="title font-normal">
                        { businessName }
                    </p>
                    <p className="owner text-[#6C6C6C] text-sm font-normal">
                        { status }
                    </p>
                </div>
            </div>
            <div className="profile_list-input_block">
                <RadioGroup>
                    <RadioGroupItem
                        value={accValue}
                        checked={checked}
                        className={`border-3 h-[26px] w-[26px] ${checked ? 'border-[#EF7800] text-transparent border-3 h-[26px] w-[26px]' : 'border-[#AEAEAE] text-transparent'}`} />
                </RadioGroup>
            </div>
        </div>
    )
}

export default ProfileListItem
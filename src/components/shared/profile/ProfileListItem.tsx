import { type FunctionComponent } from 'react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ShieldAlert } from 'lucide-react'

interface IProfileListItemProps {
  businessName: string
  status: string
  accValue: string
  checked?: boolean
  isActive: boolean
  handleSwitchProfile: () => void
  profilePictureUrl: string | null | undefined
}

const ProfileListItem: FunctionComponent<IProfileListItemProps> = ({
  businessName,
  status,
  accValue,
  checked,
  isActive,
  handleSwitchProfile,
  profilePictureUrl,
}) => {
  return (
    <div
      onClick={handleSwitchProfile}
      className={`flex items-center justify-between px-2 py-3 cursor-pointer rounded-md border-2 ${
        checked ? ' bg-[#FEF2E6]' : 'hover:bg-[#ef870010]'
      } ${
        isActive ? '':'hover:bg-none! opacity-50!'
      }`}
    >
      <div className="avatar-info flex items-center gap-2">
        <Avatar
          className={`h-11.25 w-11.25 flex items-center justify-center ${
            checked ? 'bg-button-color' : 'bg-[#3B81F6]'
          }`}
        >
          <AvatarImage
            src={`${
              profilePictureUrl
                ? profilePictureUrl
                : '/assets/images/avatar.svg'
            }`}
            className={`${
              profilePictureUrl ? 'h-full w-full object-cover' : 'h-3.75'
            }`}
          />
        </Avatar>
        <div className="profile_list-account_info">
          <p className="title font-normal">{businessName}</p>
          <p className="owner text-[#6C6C6C] text-sm font-normal">{status}</p>
        </div>
      </div>
      {!isActive && <ShieldAlert stroke='red' /> }
      <div className="profile_list-input_block">
        <RadioGroup>
          <RadioGroupItem
            value={accValue}
            checked={checked}
            className={`border-3 h-6.5 w-6.5 ${
              checked
                ? 'border-button-color text-transparent border-3 h-6.5 w-6.5'
                : 'border-[#AEAEAE] text-transparent'
            }`}
          />
        </RadioGroup>
      </div>
    </div>
  )
}

export default ProfileListItem

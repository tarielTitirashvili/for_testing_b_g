import CustomDropdown from '@/components/shared/buttons/CustomDropdown'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
// import type { TAdminUsersUser } from '../..'

// type Props = {
//   adminUser: TAdminUsersUser
// }

const AdminUsersActionButtons = (
  // props: Props
) => {
  // const { adminUser } =  props

  const { t } = useTranslation()

  return (
    <CustomDropdown trigger={<EllipsisVertical className="cursor-pointer" />}>
      <DropdownMenuGroup className="flex flex-col gap-2 p-0.5">
        <DropdownMenuItem className="cursor-pointer">
          <Pencil />
          <p>{t('bookings.actionButtons.edit')}</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-red-500">
          <Trash2 className='text-red-500' />
          <p>{t('bookings.actionButtons.delete')}</p>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </CustomDropdown>
  )
}

export default AdminUsersActionButtons

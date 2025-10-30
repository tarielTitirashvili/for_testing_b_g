import CustomDropdown from '@/components/shared/buttons/CustomDropdown'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical, Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import DeleteUserModal from './deleteUserModal'
import { useState } from 'react'
import type { TAdminUsersUser } from '../../..'

const AdminUsersActionButtons = ({ adminUser }: { adminUser: TAdminUsersUser }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const { t } = useTranslation()

  return (
    <CustomDropdown
      trigger={<EllipsisVertical className="cursor-pointer" />}
    >
      <DropdownMenuGroup className="flex flex-col gap-2 p-0.5">
        <DropdownMenuItem className="cursor-pointer">
          <Pencil />
          <p>{t('bookings.actionButtons.edit')}</p>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e)=>{e.preventDefault()}} className="cursor-pointer text-red-500 hover:text-red-500">
          <DeleteUserModal adminUser={adminUser} isOpen={deleteModalOpen} onOpenChange={setDeleteModalOpen} />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </CustomDropdown>
  )
}

export default AdminUsersActionButtons

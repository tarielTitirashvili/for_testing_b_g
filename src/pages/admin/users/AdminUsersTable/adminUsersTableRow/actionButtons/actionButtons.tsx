import CustomDropdown from '@/components/shared/buttons/CustomDropdown'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import DeleteUserModal from './deleteUserModal'
import { useState } from 'react'
import type { TAdminUsersUser, TGenderOption, TUserRole } from '../../..'
import EditUserModal from './editUserModal'

type TProps = {
  adminUser: TAdminUsersUser
  roles: TUserRole[] | undefined
  genders: TGenderOption[] | undefined
}

const AdminUsersActionButtons = (props: TProps) => {
  const { adminUser, roles, genders } = props
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  return (
    <CustomDropdown trigger={<EllipsisVertical className="cursor-pointer" />}>
      <DropdownMenuGroup className="flex flex-col gap-2 p-0.5">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
          }}
          className="cursor-pointer"
        >
          <EditUserModal
            adminUser={adminUser}
            isOpen={editModalIsOpen}
            onOpenChange={setEditModalIsOpen}
            roles={roles}
            genders={genders}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
          }}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          <DeleteUserModal
            adminUser={adminUser}
            isOpen={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
          />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </CustomDropdown>
  )
}

export default AdminUsersActionButtons

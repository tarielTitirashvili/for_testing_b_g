import type { FunctionComponent } from 'react'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { TAdminUsersUser, TGenderOption, TUserRole } from '..'

import AdminUsersTableRow from './adminUsersTableRow'
import { useTranslation } from 'react-i18next'

interface IAdminUsersTableProps {
  adminUsers: TAdminUsersUser[]
  roles: TUserRole[] | undefined
  genders: TGenderOption[] | undefined
}

const AdminUsersTable: FunctionComponent<IAdminUsersTableProps> = ({
  adminUsers,
  roles,
  genders,
}) => {
  const { t } = useTranslation()

  return (
    <Table>
      <TableHeader>
        <TableRow className="">
          <TableHead>{t('admin.users.fullName')}</TableHead>
          <TableHead>{t('admin.users.email')}</TableHead>
          <TableHead className="hidden lg:table-cell">
            {t('admin.users.phone')}
          </TableHead>

          <TableHead className="hidden lg:table-cell">
            {t('admin.users.gender')}
          </TableHead>
          <TableHead className="hidden lg:table-cell">
            {t('admin.users.role')}
          </TableHead>

          <TableHead className="hidden lg:table-cell">
            {t('admin.users.birthDate')}
          </TableHead>
          <TableHead>{t('bookings.table.status')}</TableHead>
          <TableHead>{t('bookings.table.actions')}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {adminUsers.map((adminUser) => (
          <AdminUsersTableRow
            key={adminUser.id}
            adminUser={adminUser}
            roles={roles}
            genders={genders}
          />
        ))}
      </TableBody>
    </Table>
  )
}

export default AdminUsersTable

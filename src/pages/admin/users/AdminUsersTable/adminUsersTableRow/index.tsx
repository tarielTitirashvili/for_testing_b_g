import dayjs from 'dayjs'
import StatusBadge from '@/components/shared/buttons/BookingStatusBadges'
import AdminUsersActionButtons from './actionButtons/actionButtons'
import type { TAdminUsersUser } from '../..'
import {
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { useTranslation } from 'react-i18next'

type Props = {
  adminUser: TAdminUsersUser
}

const AdminUsersTableRow = (props: Props) => {
  
  const { adminUser } = props
  const { t } = useTranslation()

  return (
    <TableRow key={adminUser.id}>
      <TableCell className="lg:w-[200px]">
        <p className="font-semibold">
          {adminUser.firstName}
          {adminUser.lastName}.
        </p>
      </TableCell>
      <TableCell className="lg:w-[180px]">
        <p className="font-normal text-xs text-[#6C6C6C]">{adminUser.email}</p>
      </TableCell>
      <TableCell className="lg:w-[120px] flex flex-col gap-1 justify-center h-[75px]">
        <div className="stars_rating flex items-center gap-3 ">
          <div className="stars flex items-center gap-1 justify-center">
            {adminUser.phoneNumber}
          </div>
        </div>
      </TableCell>

      <TableCell className="hidden lg:table-cell  break-words whitespace-normal">
        {adminUser.genderId}
      </TableCell>

      <TableCell className="hidden lg:table-cell w-[150px]">
        <span className="border-2 py-1.5 px-2.5 rounded-full font-semibold">
          {adminUser.role?.name}
        </span>
      </TableCell>
      <TableCell className="hidden lg:table-cell w-[170px]">
        <h1>
          {adminUser.birthDate
            ? dayjs(adminUser.birthDate).format('DD MMMM YYYY')
            : t('bookings.texts.notSpecified')}
        </h1>
      </TableCell>
      <TableCell className="hidden lg:table-cell w-[100px]">
        <StatusBadge
          variant={adminUser.isBlocked ? 'canceled' : 'completed'}
          label={
            adminUser.isBlocked
              ? t('admin.users.inactiveStatus')
              : t('admin.users.activeStatus')
          }
        />
      </TableCell>
      <TableCell className="lg:table-cell w-[50px] flex justify-center items-center text-center">
        <AdminUsersActionButtons adminUser={adminUser} />
      </TableCell>
    </TableRow>
  )
}

export default AdminUsersTableRow

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useDeleteUserMutation } from '@/redux/admin/usersAPISlice'

import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TAdminUsersUser } from '../../..'
import Loader from '@/components/shared/loader'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import SecondaryButton from '@/components/shared/buttons/SecondaryButton'
import { useEffect } from 'react'

type TProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  adminUser: TAdminUsersUser
}

const DeleteUserModal = (props: TProps) => {
  const { isOpen, onOpenChange, adminUser } = props
  const { t } = useTranslation()

  const [deleteUserMutation, { isLoading, isSuccess }] = useDeleteUserMutation()

  const handleDelete = () => {
    deleteUserMutation({ userId: adminUser.id })
  }

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false)
    }
  }, [isSuccess])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Loader loading={isLoading}>
        <DialogTrigger className="flex gap-3 w-full">
          <Trash2 className="text-red-500" />
          <p>{t('bookings.actionButtons.delete')}</p>
        </DialogTrigger>
        <DialogContent className="max-w-[500px] w-full px-6 py-8 flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex justify-center">
              {t('admin.users.delete')}
            </DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>
          <DialogFooter>
            <p>
              {t('admin.users.delete.confirm', {
                name: `${adminUser.firstName} ${adminUser.lastName} ${adminUser.email}`,
              })}
            </p>
          </DialogFooter>
          <span className="flex justify-around gap-6 px-4">
            <SecondaryButton onClick={() => onOpenChange(false)}>
              {t('common.button.backTitle')}
            </SecondaryButton>
            <PrimaryButton className="bg-red-500" handleClick={handleDelete}>
              {t('admin.users.delete.buttonTitle')}
            </PrimaryButton>
          </span>
        </DialogContent>
      </Loader>
    </Dialog>
  )
}

export default DeleteUserModal

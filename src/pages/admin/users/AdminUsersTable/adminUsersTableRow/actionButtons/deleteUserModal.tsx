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
      <DialogTrigger className="flex gap-3 w-full">
        <Trash2 className="text-red-500" />
        <p>{t('bookings.actionButtons.delete')}</p>
      </DialogTrigger>
      <DialogContent className="max-w-[500px] w-full px-6 py-8 flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex justify-center text-red-700">
            {t('admin.texts.userDelete')}
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <DialogFooter>
          <p>
            {t('admin.texts.confirm.userDelete', {
              user: `${adminUser.firstName} ${adminUser.lastName} ${adminUser.email}`,
            })}
          </p>
        </DialogFooter>
        <span className="flex justify-around gap-6 px-4">
          <SecondaryButton type="button" onClick={() => onOpenChange(false)}>
            {t('bookings.button.returnBack')}
          </SecondaryButton>
          <PrimaryButton
            type="submit"
            className="bg-red-500"
            handleClick={handleDelete}
            loading={isLoading}
          >
            {t('bookings.actionButtons.delete')}
          </PrimaryButton>
        </span>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteUserModal

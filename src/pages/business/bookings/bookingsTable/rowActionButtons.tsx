import CustomDropdown from '@/components/shared/buttons/CustomDropdown'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Check, CircleAlert, EllipsisVertical, Pencil, X } from 'lucide-react'
import type { BadgeVariant } from '@/components/shared/buttons/BookingStatusBadges'
import { useTranslation } from 'react-i18next'
import type { IConfirmBookingPayload } from '@/redux/business/booking/bookingAPISlice'

type Props = {
  variant: BadgeVariant
  id: number
  onClickConfirm: (payload: IConfirmBookingPayload) =>void
}

const RowActionButtons = (props: Props) => {
  const { variant, onClickConfirm, id } = props

  const { t } = useTranslation()

  return (
    <>
        {variant === 'pending' ? (
          <div className="flex items-center gap-2">
            <span className="hover:bg-[#e6e4e4] rounded-full p-1 cursor-pointer" onClick={()=>onClickConfirm({orderId: id})}>
              <Check color="#21C55D" />
            </span>
            <span className="hover:bg-[#e6e4e4] rounded-full p-1 cursor-pointer">
              <X color="#E81C1C" />
            </span>
          </div>
        ) : (
          <CustomDropdown trigger={<EllipsisVertical className='cursor-pointer' />}>
            <DropdownMenuGroup className="flex flex-col gap-2 p-0.5">
              <DropdownMenuItem className='cursor-pointer'>
                <CircleAlert />
                <p>{t('bookings.actionButtons.details')}</p>
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>
                <Pencil />
                <p>{t('bookings.actionButtons.edit')}</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </CustomDropdown>
        )}
    </>
  )
}

export default RowActionButtons
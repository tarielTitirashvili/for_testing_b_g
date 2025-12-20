import CustomDropdown from '@/components/shared/buttons/CustomDropdown'
import { DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { AlertCircle, Check, EllipsisVertical, X } from 'lucide-react'
import type { BadgeVariant } from '@/components/shared/buttons/BookingStatusBadges'
import type { IConfirmBookingPayload } from '@/redux/business/booking/bookingAPISlice'
import BookingDetails from '../bookingsActions/BookingDetails'
import type { BookingType } from '../constants'
import { t } from 'i18next'
import { useState } from 'react'

type Props = {
  variant: BadgeVariant
  id: number
  businessType: 1 | 2 | null
  onClickConfirm: (payload: IConfirmBookingPayload) =>void
  onClickCancel: (payload: IConfirmBookingPayload) =>void
  booking: BookingType
  changeNoShowStatusMutation: (orderId: number) => void
}

const RowActionButtons = (props: Props) => {
  const { variant, onClickConfirm, id, onClickCancel, booking, businessType, changeNoShowStatusMutation } = props
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  // console.log(typeofid)

  return (
    <>
        {variant === 'pending' ? (
          <div className="flex items-center gap-2">
            <span className="hover:bg-[#e6e4e4] rounded-full p-1 cursor-pointer" onClick={()=>onClickConfirm({orderId: id})}>
              <Check color="#21C55D" />
            </span>
            <span className="hover:bg-[#e6e4e4] rounded-full p-1 cursor-pointer" onClick={()=>onClickCancel({orderId: id})}>
              <X color="#E81C1C" />
            </span>
          </div>
        ) : (
          <CustomDropdown trigger={<EllipsisVertical className='cursor-pointer' />}>
            <DropdownMenuGroup className="flex flex-col gap-2 p-0.5">
              <DropdownMenuItem asChild>
                <>
                  <div
                    className="cursor-pointer hover:bg-[#F5F5F5] w-full [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    onClick={() => setModalOpen(true)}
                  >
                    <AlertCircle /> {t("bookings.actionButtons.details")}
                  </div>
                  <BookingDetails open={modalOpen} setOpen={setModalOpen} changeNoShowStatusMutation={changeNoShowStatusMutation} bookingId={id} booking={booking} variant={variant} businessType={businessType} />
                </>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </CustomDropdown>
        )}
    </>
  )
}

export default RowActionButtons
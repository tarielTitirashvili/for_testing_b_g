import { TableCell, TableRow } from '@/components/ui/table'

import { Calendar, Clock, Phone, User, Users2 } from 'lucide-react'

import StatusBadge, { type BadgeVariant } from '@/components/shared/buttons/BookingStatusBadges'

import { BOOKING_STATUS_LABELS_BY_ID, type BookingType } from '../constants'

import { useTranslation } from 'react-i18next'

import dayjs from 'dayjs'

import RowActionButtons from './rowActionButtons'
import type { IConfirmBookingPayload } from '@/redux/business/booking/bookingAPISlice'

type Props = {
  booking: BookingType,
  businessType: 1 | 2 | null
  confirmationMutation: (payload: IConfirmBookingPayload) =>void
}

const TableRows = (props: Props) => {
  const { booking, businessType, confirmationMutation } = props
  const { t } = useTranslation()
  
  const status: { label: string; variant: BadgeVariant } =
    BOOKING_STATUS_LABELS_BY_ID[
      booking.status as keyof typeof BOOKING_STATUS_LABELS_BY_ID
    ]

  const dateTime = dayjs(booking.dateTime)
    .format('DD/MMM/YYYY HH:mm')
    .split(' ')

  return (
    <TableRow key={booking.id}>
      <TableCell className="w-[30px]">
        <p className="font-[400] text-[#242424]">{booking.id}</p>
      </TableCell>

      <TableCell className="flex flex-col justify-center gap-1 min-w-[110px] h-[75px]">
        <span className='flex flex-col gap-1.5 text-[12px] 2xl:text-base break-words whitespace-normal'>
          <p className="flex gap-2 font-[500] text-[12px] 2xl:text-base">
            <Calendar color="#6C6C6C" width={16} height={16} />
            {dateTime[0]}
          </p>
          <p className="flex gap-2 font-[400] text-[#6C6C6C] text-[12px] 2xl:text-base">
            <Clock width={16} height={16} />
            {dateTime[1]}
          </p>
        </span>
      </TableCell>

      <TableCell className="break-words whitespace-normal min-w-[130px]">
        <span className="flex flex-col gap-2 justify-center">
          <p className="flex gap-1.5 items-center text-[12px] 2xl:text-base break-words whitespace-normal">
            <User color="#6C6C6C" height={16} width={16} />
            {booking.customer}
          </p>
          <p className="flex gap-1.5 items-center text-[#6C6C6C] text-[12px] 2xl:text-base break-words whitespace-normal">
            <Phone height={16} width={16} />
            {booking.phone}
          </p>
        </span>
      </TableCell>


      {businessType === 1 ? (
        <>
          <TableCell className='flex items-center'><Users2 /> {booking.guestsAmount} {t('space.card.guestCnt')}</TableCell>
          <TableCell>{booking.table}</TableCell>
        </>
      ) : businessType === 2 ? (
        <>
          <TableCell>{booking.service}</TableCell>
          <TableCell>{booking.teamMember}</TableCell>
          <TableCell>{booking.duration}</TableCell>
          <TableCell>{booking.price}</TableCell>
        </>
      ) : null}


      {/* <TableCell className="min-w-[100px] font-[400] text-[12px] 2xl:text-base break-words whitespace-normal">
        {booking.service}
      </TableCell>
      <TableCell className="min-w-[110px] font-[400] text-[12px] 2xl:text-base break-words whitespace-normal">
        {booking.teamMember}
      </TableCell>
      <TableCell className="min-w-[110px] font-[400] text-[12px] 2xl:text-base break-words whitespace-normal">{booking.duration}</TableCell>
      <TableCell className="min-w-[50px] font-[400] text-[12px] 2xl:text-base break-words whitespace-normal">{booking.price}</TableCell> */}
      
      <TableCell className="max-w-[134px] min-w-[80px] h-[75px] font-[400]">
        <div className="latest_book_item-status min-w-[170px] w-full">
          <StatusBadge
            variant={status.variant}
            label={t(status.label)}
            className="h-[26px] w-[120px]  2xl:h-[30px] 2xl:w-[133px]"
          />
        </div>
      </TableCell>
      <TableCell className="min-w-[90px] h-[75px] font-[400] flex justify-center items-center pl-5">
        <RowActionButtons variant={status.variant} id={booking.id} onClickConfirm={confirmationMutation}  />
      </TableCell>
    </TableRow>
  )
}

export default TableRows
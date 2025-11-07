import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { type BookingType } from '../constants'

import { useTranslation } from 'react-i18next'

import TableRows from './tableRows'

type Props = {
  bookings: BookingType[]
  businessType: 1 | 2 | null
}

const BookingsTable = (props: Props) => {
  const { bookings, businessType } = props
  const { t } = useTranslation()

  const tableHeadRenderer = (children: React.ReactNode) => (
    <TableHead className="text-[12px] 2xl:text-base text-[#6C6C6C]">{children}</TableHead>
  )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {(() => {
            switch (businessType) {
              case 1:
                return (
                  <>
                    {tableHeadRenderer('ID')}
                    {tableHeadRenderer(t('bookings.table.date&time'))}
                    {tableHeadRenderer(t('bookings.table.guest'))}
                    {tableHeadRenderer(t('bookings.table.guestCount'))}
                    {tableHeadRenderer(t('bookings.table.tableName'))}
                    {tableHeadRenderer(t('bookings.table.status'))}
                    {tableHeadRenderer(t('bookings.table.actions'))}
                  </>
                )
              case 2:
                return (
                  <>
                    {tableHeadRenderer('ID')}
                    {tableHeadRenderer(t('bookings.table.date&time'))}
                    {tableHeadRenderer(t('bookings.table.guest'))}
                    {tableHeadRenderer(t('bookings.table.service'))}
                    {tableHeadRenderer(t('bookings.teamMembers.title'))}
                    {tableHeadRenderer(t('bookings.table.duration'))}
                    {tableHeadRenderer(t('bookings.table.price'))}
                    {tableHeadRenderer(t('bookings.table.status'))}
                    {tableHeadRenderer(t('bookings.table.actions'))}
                  </>
                )
              default:
                return null
            }
          })()}
        </TableRow>
      </TableHeader>

      <TableBody>
        {bookings.map((booking, index) => {
          return <TableRows booking={booking} key={index} businessType={businessType} />
        })}
      </TableBody>
    </Table>
  )
}

export default BookingsTable

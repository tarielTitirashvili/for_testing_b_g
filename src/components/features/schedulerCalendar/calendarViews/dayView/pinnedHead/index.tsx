import type { IStaff } from '@/redux/business/booking/bookingAPISlice'
import type { ITableInfo } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import PinnedStaffHead from './pinnedStaffHead'
import PinnedTableHead from './pinnedTableHead'

type Props = {
  calendarEventsData: Array<{ staff: IStaff } | { table: ITableInfo }>
}

const PinnedHead = (props: Props) => {
  
  const { calendarEventsData } = props
  console.log('calendarEventsData', calendarEventsData)
  return (
    <>
      {calendarEventsData?.map((item) => {
        const id = 'staff' in item ? item.staff.id : item.table.id

        if('staff' in item){
          return <PinnedStaffHead key={id} staff={item.staff} />
        }else{
          return <PinnedTableHead key={id} table={item.table} />
        }
      })}
    </>
  )
}

export default PinnedHead

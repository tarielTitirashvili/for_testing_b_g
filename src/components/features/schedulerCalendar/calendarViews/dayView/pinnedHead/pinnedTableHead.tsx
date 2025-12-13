import type { ITableInfo } from '@/redux/business/schedulerCalendar/schedulerCalendarAPISlice'
import tableOutside from '@/../public/assets/images/tableOutside.svg'
import tableInside from '@/../public/assets/images/tableInside.svg'

type Props = {
  table: ITableInfo
}

const PinnedTableHead = (props: Props) => {
  const { table } = props
  
  const isOutsideTable = table.category.tableCategoryTypeId === 2

  return (
    <div className="h-25 min-w-25 bg-[#fff] border-b-2 border-r-2 border-[#EBEBEB] flex items-center justify-center flex-col text-center gap-1 p-1">
      <span className={`w-7.5 h-7.5 flex items-center justify-center rounded-full bg-[${isOutsideTable ? '#FEF2E6' : '#FEF2E6'}] p-1`}>
        <img className='w-5.5 h-5.5 select-none' src={isOutsideTable ? tableOutside : tableInside} alt="Outside Table" />
      </span>
      <p className='font-medium'>{table.name}</p>
    </div>
  )
}

export default PinnedTableHead
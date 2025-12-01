import type { IStaff } from '@/redux/business/booking/bookingAPISlice'
import { CircleUserRound } from 'lucide-react'

type Props = {
  staff: IStaff
}

const PinnedStaffHead = (props: Props) => {
  const { staff } = props
  return (
    <div className="h-25 min-w-25 bg-[#fff] border-b-2 border-r-2 border-[#EBEBEB] flex items-center justify-center flex-col text-center gap-1 p-1">
      {staff?.file?.url ? (
        <img
          src={staff?.file?.url}
          alt="avatar"
          className="w-11 h-11 rounded-full mr-2 object-cover select-none"
        />
      ) : (
        <CircleUserRound className='w-11 h-11' />
      )}
      <p className='font-medium'>
        {staff.firstName} {staff.lastName}
      </p>
    </div>
  )
}

export default PinnedStaffHead

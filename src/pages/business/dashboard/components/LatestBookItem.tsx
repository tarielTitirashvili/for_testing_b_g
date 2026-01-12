import { type FunctionComponent } from 'react'

import { Calendar, Clock, User } from 'lucide-react'

import StatusBadge from '@/components/shared/buttons/BookingStatusBadges'

interface ILatestBookItemProps {
    firstName: string
    lastName: string
    service: string
    date: string
    time: string
    status: string
    statusLabel?: string
}

const randomBgs = () => {
    const bgs = ['#EAB305', '#3B81F6', '#171717', '#21C55D', '#F94B00']
    const randomBg = Math.floor(Math.random() * bgs.length)
    return bgs[randomBg]
}

const LatestBookItem: FunctionComponent<ILatestBookItemProps> = ({ firstName, lastName, service, date, time, status, statusLabel }) => {
    return (
        <div className='latest_book_item border-1 flex flex-col sm:flex-row justify-between items-start sm:items-center sm:gap-0 gap-3 px-2 py-3 rounded-sm overflow-auto'>
            <div className="latest_book_item-left flex items-center gap-2">
                <div
                    className="latest_book_item-logo h-[45px] w-[45px] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: randomBgs() }}
                >
                    <User color='white' />
                </div>
                <div className="latest_book_item-user_info">
                    <p className='font-normal'>{ firstName } { lastName }</p>
                    <p className='text-[#6C6C6C]'>{ service }</p>
                </div>
            </div>
            <div className="latest_book_item-right flex items-center gap-6">
                <div className="latest_book_item-date_info text-[#6C6C6C] flex flex-col gap-1">
                    <p className='flex gap-1'><Calendar size={20} /> { new Date(date).toLocaleDateString() }</p>
                    <p className='flex gap-1'><Clock size={20} /> { time }</p>
                </div>
                <div className="latest_book_item-status min-w-[170px] w-full">
                    <StatusBadge variant={status === 'completed' ? 'completed' : 'canceled'} label={statusLabel ? statusLabel : ''} className='h-[30px]' />
                </div>
            </div>
        </div>
    )
}

export default LatestBookItem
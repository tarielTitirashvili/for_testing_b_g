import { type FunctionComponent } from 'react'

import TextInput from '@/components/shared/inputs/TextInput'

import { Search } from 'lucide-react'
import { t } from 'i18next'

interface IReviewsHeaderProps {
    reviewsCount: number
    value: string
    setValue?: (value: string) => void
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ReviewsHeader: FunctionComponent<IReviewsHeaderProps> = ({ reviewsCount, value, handleChange }) => {
    return (
        <div className='reviews_header flex items-start justify-between flex-col sm:flex-row sm:items-center'> 
            <div className="reviews_header-count text-lg font-semibold">
                {t("reviews.table.title")} ({reviewsCount})
            </div>
            <div className="reviews_header-search relative text-[#6C6C6C]">
                <Search className='absolute top-[55%] -translate-y-1/2 left-[10px]' size={15} />
                <TextInput
                    placeholder={t("bookings.button.search")}
                    className='pl-[30px] max-w-[300px] w-full border-[#EBEBEB]'
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default ReviewsHeader
    
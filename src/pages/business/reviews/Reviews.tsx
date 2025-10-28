import { useEffect, useState, type FunctionComponent } from "react"

import ReviewsHeader from "@/pages/business/reviews/components/ReviewsHeader"
import ReviewsTable from "@/pages/business/reviews/components/ReviewsTable"
import CustomPagination from '@/components/shared/pagination'

// import { Skeleton } from "@/components/ui/skeleton"
// import { useDebounce } from "@/hooks/useDebounce"

interface IReviews {
    id: number
    commentId: string
    firstName: string,
    lastName: string,
    rating: string,
    review: string,
    service?: string,
    guestCount?: number,
    date: string
}

const Reviews: FunctionComponent = () => {

    const bizType: 'restaurant' | 'barbershop' = 'barbershop'

    const [value, setValue] = useState<string>('')
    const [filteredReviews, setFilteredReviews] = useState<IReviews[]>([])


    const [reviews, setReviews] = useState<IReviews[]>([])
    const [reviewsPerPage, setReviewsPerPage] = useState<IReviews[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalCount, setTotalCount] = useState<number>(0)
    const limit = 7

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        setFilteredReviews(reviews.filter(review => review.review.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
    }

    const fetchReviews = async (page: number, limit: number) => {
        const res = await fetch(`https://689088ce944bf437b5965666.mockapi.io/Reviews?page=${page}&limit=${limit}`)
        const allRes = await fetch(`https://689088ce944bf437b5965666.mockapi.io/Reviews`)
        
        console.log("total: " + res.headers.get('X-total-count'))

        const data: IReviews[] = await res.json()
        const allData: IReviews[] = await allRes.json()

        setReviews(allData)
        setReviewsPerPage(data)
        setTotalCount(allData.length)

    }
    
    // const fetchReviews = async (page: number, limit: number) => {
        
    //     const res = await fetch(`https://689088ce944bf437b5965666.mockapi.io/Restaurant_Reviews?page=${page}&limit=${limit}`)
    //     const allRes = await fetch(`https://689088ce944bf437b5965666.mockapi.io/Restaurant_Reviews`)
    
    //     // console.log("total: " + allRes.headers.get('X-Total-Count'))   
    
    //     const data: IReviews[] = await res.json()
    //     const allData: IReviews[] = await allRes.json()
    
    //     setReviews(allData)
    //     setReviewsPerPage(data)
    //     setTotalCount(allData.length)
    
    // }
    
    useEffect(() => {
        fetchReviews(currentPage, limit)
    }, [currentPage])
    
    return (
        <div className="bg-white p-5 rounded-md flex flex-col gap-6">
            <ReviewsHeader reviewsCount={value.length ? filteredReviews.length : reviews.length} value={value} handleChange={handleChange} />
            <ReviewsTable bizType={bizType} reviews={value.length ? filteredReviews : reviewsPerPage} />
            <CustomPagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalCount / limit)}
                onPageChange={(page: number) => setCurrentPage(page)}
                pagesContainerClassname='w-full'
            />
        </div>

        // <div className="bg-white p-5 rounded-md flex flex-col gap-6">
        //     <ReviewsHeader reviewsCount={value.length ? filteredReviews.length : reviews.length} value={value} handleChange={handleChange} />
        //     <ReviewsTable bizType={bizType} reviews={value.length ? filteredReviews : reviewsPerPage} />
        //     <PaginationButton
        //         currentPage={currentPage}
        //         totalPages={Math.ceil(totalCount / limit)}
        //         onPageChange={(page: number) => setCurrentPage(page)}
        //     />
        // </div>
    )
}

export default Reviews
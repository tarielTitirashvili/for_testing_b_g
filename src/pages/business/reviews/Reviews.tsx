import type { FunctionComponent } from "react"
import ReviewsHeader from "./components/ReviewsHeader"

const Reviews: FunctionComponent = () => {
    
    return (
        <div className="bg-white p-5 rounded-md flex flex-col gap-6">
            <ReviewsHeader reviewsCount={0} value={'value'} handleChange={() => console.log('typing')} />
        </div>
    )
}

export default Reviews
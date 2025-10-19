import type { FunctionComponent } from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star } from "lucide-react";
import { t } from "i18next";

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

interface IReviewsTableProps {
    bizType: 'restaurant' | 'barbershop'
    reviews: IReviews[]
}

const ReviewsTable: FunctionComponent<IReviewsTableProps> = ({ bizType, reviews }) => {


    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="">
                        <TableHead>{ t("bookings.table.guest") }</TableHead>
                        <TableHead>{ t("bookings.table.rating") }</TableHead>
                        <TableHead className="hidden lg:table-cell">{ t("bookings.table.review") }</TableHead>

                        { bizType === 'barbershop' && <TableHead className="hidden lg:table-cell">{ t("bookings.table.service") }</TableHead> }
                        { bizType === 'restaurant' && <TableHead className="hidden lg:table-cell">{ t("bookings.table.guest") }</TableHead> }

                        <TableHead className="hidden lg:table-cell">{ t("bookings.table.date") }</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {reviews.map((review) => (
                        <TableRow key={review.id}>
                            <TableCell className="w-full lg:w-[230px]">
                                <p className="font-semibold">
                                    {review.firstName} {review.lastName.slice(0, 1)}.
                                </p>
                                <p className="font-normal text-xs text-[#6C6C6C]">{review.commentId}</p>
                            </TableCell>

                            <TableCell className="w-full lg:w-[230px] flex flex-col gap-1 justify-center h-[75px]">
                                <div className="stars_rating flex items-center gap-3 ">
                                    <div className="stars flex items-center gap-1 justify-center">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < Math.round(+review.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-yellow-500'}
                                            />
                                        ))}
                                    </div>
                                    <span>{Math.round(+review.rating)}</span>
                                </div>
                                <div className="date text-[#aeaeae] text-lg text-right lg:hidden">
                                    {new Date(review.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </div>
                            </TableCell>

                            <TableCell className="hidden lg:table-cell w-[500px] break-words whitespace-normal">{review.review}</TableCell>

                            <TableCell className="hidden lg:table-cell w-[200px]">
                                {bizType == 'barbershop' && (
                                    <span className="border-2 py-1.5 px-2.5 rounded-full font-semibold">
                                        {review.service}
                                    </span>
                                )}
                                {bizType == 'restaurant' && (
                                    <span>
                                        {review.guestCount}
                                    </span>
                                )}
                            </TableCell>

                            <TableCell className="hidden lg:table-cell w-[200px]">
                                {new Date(review.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </TableCell>
                        </TableRow>
                    ))} 
                </TableBody>

            </Table>
        </>
    )
}

export default ReviewsTable
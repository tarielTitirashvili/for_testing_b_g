import { type FunctionComponent } from "react"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

interface IPaginationButtonProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const PaginationButton: FunctionComponent<IPaginationButtonProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div>
            <Pagination>
                <PaginationContent className="flex w-full items-center">
                    <PaginationItem className="hidden lg:flex">
                        <PaginationPrevious
                            className={`border-2 hover:border-transparent ${currentPage <= 1 && "pointer-events-none opacity-50"}`}
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        />
                    </PaginationItem>

                    <div className="pagination_wrapper flex flex-col gap-2 w-full">
                        <div className="pagination_body flex flex-1 gap-1 justify-center h-full">
                            {pagesToShow.map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        isActive={page === currentPage}
                                        onClick={() => onPageChange(page)}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        </div>
                        <div className="pagination_buttons flex gap-2 lg:hidden">
                            <PaginationItem className="flex-1">
                                <PaginationPrevious
                                    className={`border-2 w-full hover:border-transparent ${currentPage <= 1 && "pointer-events-none opacity-50"}`}
                                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                                />
                            </PaginationItem>
                            <PaginationItem className="flex-1">
                                <PaginationNext
                                    className={`border-2 w-full hover:border-transparent ${currentPage >= Math.min(totalPages, currentPage + 1) && "pointer-events-none opacity-50"}`}
                                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                                />
                            </PaginationItem>
                        </div>
                    </div>

                    <PaginationItem className="hidden lg:flex">
                        <PaginationNext
                            className={`border-2 hover:border-transparent ${currentPage >= Math.min(totalPages, currentPage + 1) && "pointer-events-none opacity-50"}`}
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        />
                    </PaginationItem>

                    
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default PaginationButton
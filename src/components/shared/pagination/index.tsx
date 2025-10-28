import { type FunctionComponent } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface ICustomPaginationProps {
  currentPage: number
  totalPages: number
  containerClassname?: string
  pagesContainerClassname?: string
  paginationContentContainerClassname?: string
  onPageChange: (page: number) => void
}

const CustomPagination: FunctionComponent<ICustomPaginationProps> = ({
  currentPage,
  totalPages,
  containerClassname = '',
  pagesContainerClassname = '',
  paginationContentContainerClassname = '',
  onPageChange,
}) => {
  const pagesToShow = {
    prev2Page: currentPage - 2 > 0 ? currentPage - 2 : null,
    prev1Page: currentPage - 1 > 0 ? currentPage - 1 : null,
    next1Page: currentPage + 1 <= totalPages ? currentPage + 1 : null,
    next2Page: currentPage + 2 <= totalPages ? currentPage + 2 : null,
  }

  return (
    <Pagination className={containerClassname}>
      <PaginationContent
        className={`flex w-full items-center ${paginationContentContainerClassname}`}
      >
        <PaginationItem className="hidden lg:flex">
          <PaginationPrevious
            className={`border-2 hover:border-transparent ${
              currentPage <= 1 && 'pointer-events-none opacity-50'
            }`}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>
        {currentPage - 4 > 0 && (
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(1)}>{1}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage - 4 >= 1 && (
          <PaginationEllipsis
            onClick={() => onPageChange(Math.max(1, currentPage - 3))}
          />
        )}

        <div
          className={`pagination_wrapper flex flex-col gap-2 ${pagesContainerClassname}`}
        >
          <div className="pagination_body flex gap-1 justify-center h-full">
            {pagesToShow.prev2Page !== null && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(pagesToShow.prev2Page as number)}
                >
                  {pagesToShow.prev2Page}
                </PaginationLink>
              </PaginationItem>
            )}
            {pagesToShow.prev1Page !== null && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(pagesToShow.prev1Page as number)}
                >
                  {pagesToShow.prev1Page}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                isActive
                onClick={() => onPageChange(currentPage)}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {pagesToShow.next1Page !== null && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(pagesToShow.next1Page as number)}
                >
                  {pagesToShow.next1Page}
                </PaginationLink>
              </PaginationItem>
            )}
            {pagesToShow.next2Page !== null && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(pagesToShow.next2Page as number)}
                >
                  {pagesToShow.next2Page}
                </PaginationLink>
              </PaginationItem>
            )}
          </div>
          <div className="pagination_buttons flex gap-2 lg:hidden">
            <PaginationItem className="flex-1">
              <PaginationPrevious
                className={`border-2 hover:border-transparent ${
                  currentPage <= 1 && 'pointer-events-none opacity-50'
                }`}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            <PaginationItem className="flex-1">
              <PaginationNext
                className={`border-2 hover:border-transparent ${
                  currentPage >= Math.min(totalPages, currentPage + 1) &&
                  'pointer-events-none opacity-50'
                }`}
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
              />
            </PaginationItem>
          </div>
        </div>
        {currentPage + 3 < totalPages && (
          <PaginationEllipsis
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 3))}
          />
        )}
        {currentPage + 3 < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(totalPages)}>{totalPages}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem className="hidden lg:flex">
          <PaginationNext
            className={`border-2 hover:border-transparent ${
              currentPage >= Math.min(totalPages, currentPage + 1) &&
              'pointer-events-none opacity-50'
            }`}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CustomPagination

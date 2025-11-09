import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

type TProps = {
  cellCount?: number
}

const TableSkeletonRow = (props: TProps) => {
  const { cellCount = 9 } = props

  return (
    <TableRow>
      {Array.from({ length: cellCount }, (_, i) => i).map((i) => (
        <TableCell key={i}>
          <Skeleton className="h-5 w-[100px]" />
        </TableCell>
      ))}
    </TableRow>
  )
}

export default TableSkeletonRow

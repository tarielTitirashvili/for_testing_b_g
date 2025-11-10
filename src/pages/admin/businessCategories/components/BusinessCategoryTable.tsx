import type { FunctionComponent } from "react"

import { t } from "i18next"

import type { IBusinessCategory } from "../BusinessCategories"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Skeleton } from "@/components/ui/skeleton"

import { Trash2 } from "lucide-react"

import AddBusinessCategory from "./AddBusinessCategory"

interface IBusinessCategoryTable {
    businessCategoryData: IBusinessCategory[],
    deleteBusinessCategory: (businessCategoryId: { id: number }) => void
    isBusinessCategoryLoading: boolean
}

const BusinessCategoryTable: FunctionComponent<IBusinessCategoryTable> = ({ businessCategoryData, deleteBusinessCategory, isBusinessCategoryLoading }) => {
    
    if (isBusinessCategoryLoading) {
        return (
            <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </>
        )
    }
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-full">{ t('business.business') }</TableHead>
                    <TableHead>{ t('bookings.table.actions') }</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {businessCategoryData?.map(category => (
                    <TableRow key={ category.id }>
                        <TableCell>{ category.name }</TableCell>
                        <TableCell className="flex gap-2 justify-end">
                            <AddBusinessCategory businessCategoryId={category.id} />
                            <Trash2 onClick={() => deleteBusinessCategory({ id: category.id })} className="cursor-pointer text-red-600" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default BusinessCategoryTable
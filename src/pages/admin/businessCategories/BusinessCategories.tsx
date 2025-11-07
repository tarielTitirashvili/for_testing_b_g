import type { FunctionComponent } from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Trash2 } from "lucide-react"

import { useDeleteBusinessCategoryMutation, useGetAllBusinessCategoriesQuery } from "@/redux/admin/businessCategory/businessCategoryAPISlice"

import { t } from "i18next"

import AddBusinessCategory from "./components/AddBusinessCategory"
import TextInput from "@/components/shared/inputs/TextInput"

export interface IBusinessCategory {
    id: number,
    name: string
}

const BusinessCategories: FunctionComponent = () => {

    const { data: businessCategoryData } = useGetAllBusinessCategoriesQuery()
    const [deleteBusinessCategory] = useDeleteBusinessCategoryMutation()

    return (
        <div className="business_categories bg-white p-5 rounded-md">

            <div className="regions_header flex items-center justify-between">
                <div className="reviews_header-search relative text-[#6C6C6C]">
                    <Search
                        className="absolute top-[55%] -translate-y-1/2 left-[10px]"
                        size={15}
                    />
                    <TextInput
                        className="pl-[30px] max-w-[300px] w-full border-[#EBEBEB]"
                        placeholder={t('bookings.button.search')}
                    />
                </div>
                <AddBusinessCategory />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-full">Name</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {businessCategoryData?.map(category => (
                        <TableRow key={ category.id }>
                            <TableCell>{ category.name }</TableCell>
                            <TableCell className="flex gap-2">
                                <AddBusinessCategory businessCategoryId={category.id} />
                                <Trash2 onClick={() => deleteBusinessCategory({ id: category.id })} className="cursor-pointer text-red-600" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default BusinessCategories
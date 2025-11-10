import type { FunctionComponent } from "react"

import { Search } from "lucide-react"

import { useDeleteBusinessCategoryMutation, useGetAllBusinessCategoriesQuery } from "@/redux/admin/businessCategory/businessCategoryAPISlice"

import { t } from "i18next"

import AddBusinessCategory from "./components/AddBusinessCategory"
import TextInput from "@/components/shared/inputs/TextInput"
import BusinessCategoryTable from "./components/BusinessCategoryTable"

export interface IBusinessCategory {
    id: number,
    name: string
}

const BusinessCategories: FunctionComponent = () => {

    const { 
        data: businessCategoryData,
        isLoading: isBusinessCategoryLoading,
    } = useGetAllBusinessCategoriesQuery()

    const [deleteBusinessCategory] = useDeleteBusinessCategoryMutation()

    return (
        <div className="business_categories bg-white p-5 rounded-md flex flex-col gap-4">

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

            <BusinessCategoryTable
                businessCategoryData={businessCategoryData ?? []}
                deleteBusinessCategory={deleteBusinessCategory}
                isBusinessCategoryLoading={isBusinessCategoryLoading}
            />

        </div>
    )
}

export default BusinessCategories
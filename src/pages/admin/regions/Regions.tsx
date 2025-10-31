import type { FunctionComponent } from "react"

import { useDeleteRegionMutation, useGetAllRegionQuery } from "@/redux/admin/region/regionAPISlice"

import { Search } from "lucide-react"

import { t } from "i18next"

import TextInput from "@/components/shared/inputs/TextInput"

import RegionsTable from "./components/RegionsTable"
import AddRegion from "./components/AddRegion"

export interface IRegion {
    id: number,
    name: string,
}

export interface IRegionDetail {
  id: number;
  locales: {
    name: string;
    languageId: number;
  }[];
}

const Regions: FunctionComponent = () => {

    const { data:regionsList = [], isLoading: isRegionListLoading } = useGetAllRegionQuery()
    const [deleteRegion] = useDeleteRegionMutation()

    return (
        <div className="bg-white p-5 rounded-md flex flex-col gap-4">
            <div className="regions_header flex items-center justify-between">
                <div className="reviews_header-search relative text-[#6C6C6C] w-full">
                    <Search
                        className="absolute top-[55%] -translate-y-1/2 left-[10px]"
                        size={15}
                    />
                    <TextInput
                        className="pl-[30px] max-w-[300px] w-full border-[#EBEBEB]"
                        placeholder={t('bookings.button.search')}
                    />
                </div>
                <AddRegion />
            </div>  
            <RegionsTable handleRemoveRegion={deleteRegion}  regionsList={regionsList ?? []} isRegionListLoading={isRegionListLoading} />
        </div>
    )
}

export default Regions
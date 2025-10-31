import { useState, type FunctionComponent } from "react"

import { useDeleteDistrictMutation, useGetAllDistrictsQuery, useGetAllRegionQuery } from "@/redux/admin/region/regionAPISlice"

import { Search } from "lucide-react"

import { t } from "i18next"

import RegionsAndDistrictsList from "./components/RegionsAndDistrictsList"
import TextInput from "@/components/shared/inputs/TextInput"
import AddDistrict from "./components/AddDistrict"

const Districts: FunctionComponent = () => {

    const [regionId, setRegionId] = useState<number | undefined>(undefined)

    const { data: regionList = [] } = useGetAllRegionQuery()

    const { 
        data: districtList = [],
        isFetching: isDistrictDataFetching
    } = useGetAllDistrictsQuery({ regionId }, { skip: !regionId })

    const [deleteDistrict] = useDeleteDistrictMutation()

    return (
        <div className="bg-white p-5 rounded-md">
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
                <AddDistrict regions={regionList} />
            </div>  
            <RegionsAndDistrictsList
                districtList={districtList}
                regionList={regionList}
                setRegionId={setRegionId}
                handleDistrictRemove={deleteDistrict}
                isDistrictDataFetching={isDistrictDataFetching}
            />
        </div>
    )
}

export default Districts

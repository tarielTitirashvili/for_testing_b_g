import type React from "react"

import type { FunctionComponent, SetStateAction } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Trash2 } from "lucide-react"

import type { IDistrict } from "@/redux/admin/region/regionAPISlice"

import type { IRegion } from "../../regions/Regions"

import { Skeleton } from "@/components/ui/skeleton"

import AddDistrict from "./AddDistrict"
import { t } from "i18next"

interface IRegionsAndDistrictsListProps {
    regionList: IRegion[],
    isRegionLoading: boolean
    districtList: IDistrict[]
    setRegionId: React.Dispatch<SetStateAction<number | undefined>>
    handleDistrictRemove: (districtId: number) => void
    isDistrictDataFetching: boolean
}

const RegionsAndDistrictsList: FunctionComponent<IRegionsAndDistrictsListProps> = ({ regionList, districtList, isRegionLoading, setRegionId, handleDistrictRemove, isDistrictDataFetching }) => {
    
    if (isRegionLoading) {
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
        <Accordion type="single" collapsible>
            {regionList.map(region => (
                <AccordionItem key={region.id} value={region.name}>
                    <AccordionTrigger onClick={() => setRegionId(region.id)}>{ region.name }</AccordionTrigger>
                    <AccordionContent>
                        {districtList.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-full">{ t('admin.district') }</TableHead>
                                        <TableHead>{ t('bookings.table.actions') }</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    { isDistrictDataFetching ? (
                                        <TableRow className="flex flex-col gap-4">
                                            <TableCell><Skeleton className="h-5 w-full"></Skeleton></TableCell>
                                            <TableCell><Skeleton className="h-5 w-full"></Skeleton></TableCell>
                                        </TableRow>
                                    ) : (
                                        <>
                                            {districtList.map((district) => (
                                                <TableRow key={district.id}>
                                                    <TableCell>{ district.name }</TableCell>
                                                    <TableCell className="flex gap-2 justify-end">
                                                        <AddDistrict districtId={district.id} regions={regionList} />
                                                        <Trash2 onClick={() => handleDistrictRemove(district.id)} className="cursor-pointer" color="red" size={20} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                    )}
                                </TableBody>
                            </Table>
                        ) : (
                            isDistrictDataFetching ? (
                                <div className="flex flex-col gap-4">
                                    <Skeleton className="h-5 w-full"></Skeleton>
                                    <Skeleton className="h-5 w-full"></Skeleton>
                                </div>
                            ) : (
                                <p>There no any districts yet</p>
                            )
                        )}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default RegionsAndDistrictsList
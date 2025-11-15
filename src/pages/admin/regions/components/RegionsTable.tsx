import type { FunctionComponent } from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Skeleton } from "@/components/ui/skeleton"

import type { IRegion } from "../Regions"

import { t } from "i18next"

import AddRegion from "./AddRegion"
import DeleteConfirmationModal from "@/components/shared/modal/DeleteConfirmationModal"

interface IRegionsTableProps {
    regionsList: IRegion[] | []
    handleRemoveRegion: (regionId: number) => void
    isRegionListLoading: boolean
}

const RegionsTable: FunctionComponent<IRegionsTableProps> = ({ regionsList, handleRemoveRegion, isRegionListLoading }) => {

    if (isRegionListLoading) {
        return (
            <div className="flex flex-col gap-1">
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
            </div>
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-full">{ t('admin.region') }</TableHead>
                    <TableHead>{ t('bookings.table.actions') }</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {regionsList && regionsList.map((region) => (
                    <TableRow key={region.id}>
                        <TableCell>{ region.name }</TableCell>
                        <TableCell className="flex gap-2 justify-end">
                            <AddRegion regionId={region.id} />
                            <DeleteConfirmationModal
                                handleDeleteItem={handleRemoveRegion}
                                itemId={region.id}
                                modalTitle={ t('admin.modal.deleteRegion.title') }
                                modalDescription={ t("admin.modal.deleteRegion.text", {
                                    region: `"${region.name}"`
                                }) }
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default RegionsTable
import type { FunctionComponent } from "react"
import { useGetStaffQuery } from "@/redux/business/staff/staffAPISlice"
import StaffCard from "./staff/StaffCard"
import EmptyResponse from '@/components/shared/emptyResponse'
import { useTranslation } from 'react-i18next'
import type { IService } from '@/redux/business/service/serviceAPISlice'
import type { TFile } from '../businessProfile/BusinessProfile'

export interface IStaffCard {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    role: {
        id: string
        name: string
    }
    file: TFile | null
    services: IService[]
}

const Team: FunctionComponent = () => {
    const { data: staffData, isSuccess: isStaffDataSuccess, isError: isStaffDataError } = useGetStaffQuery()
    const { t } = useTranslation()

    if (isStaffDataError) return <h1>{t('business.texts.thereWasError')}</h1>


    return (
        <div className="flex flex-col gap-6 py-6">
            <div className="team_header flex items-center justify-between">
                <div className="team_header-member_count text-lg font-semibold">
                    { t("team.staff.count") } ({staffData?.length ?? 0})
                </div>
            </div>
            {staffData?.length === 0 && <EmptyResponse />}
            <div className="team_members-list flex flex-wrap gap-6">
                {isStaffDataSuccess && staffData?.map((staff) => (
                    <StaffCard key={staff.id} {...staff} />
                ))}
            </div>
        </div>
    )
}

export default Team
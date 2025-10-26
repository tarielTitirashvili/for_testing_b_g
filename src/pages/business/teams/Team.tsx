import type { FunctionComponent } from "react"
import { t } from "i18next"
import { useGetStaffQuery } from "@/redux/business/staff/staffAPISlice"
import StaffCard from "./staff/StaffCard"

export interface IStaffCard {
    id: string,
    firstName: string,
    lastName: string,
    role: {
        id: string,
        name: string
    },
    services: {
        id: number,
        name: string
    }[]
}

const Team: FunctionComponent = () => {
    const { data: staffData, isSuccess: isStaffDataSuccess, isError: isStaffDataError } = useGetStaffQuery()

    if (isStaffDataError) return <h1>No data</h1>

    return (
        <div className="flex flex-col gap-6 py-6">
            <div className="team_header flex items-center justify-between">
                <div className="team_header-member_count text-lg font-semibold">
                    { t("team.staff.count") } ({staffData?.length ?? 0})
                </div>
            </div>
            <div className="team_members-list flex flex-wrap gap-6">
                {isStaffDataSuccess && staffData?.map((staff) => (
                    <StaffCard key={staff.id} {...staff} />
                ))}
            </div>
        </div>
    )
}

export default Team
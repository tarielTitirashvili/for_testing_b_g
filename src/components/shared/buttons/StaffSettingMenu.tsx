import type { FunctionComponent } from "react"

import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Calendar, EllipsisVertical, Pencil, Trash2 } from "lucide-react"

import { t } from "i18next"

import CustomDropdown from "./CustomDropdown"
// import AddStaff from "@/pages/business/teams/staff/AddStaff"

interface IStaffSettingMenu {
    id: string,
    roles: {
        id: string,
        name: string
    }[],
    services: {
        id: number,
        name: string
    }[]
}

const StaffSettingMenu: FunctionComponent<IStaffSettingMenu> = () => {
    return (
        <CustomDropdown
            trigger={<EllipsisVertical className="cursor-pointer hover:bg-[#eff0f1] p-1 rounded-sm" size={30} />}
        >
            <DropdownMenuGroup>
                <DropdownMenuItem className="font-medium cursor-pointer">
                    <Calendar fontWeight={800} color="black" /> { t("bookings.button.seeInCalendar") }
                </DropdownMenuItem>
                {/* <DropdownMenuItem asChild className="font-medium cursor-pointer" onSelect={e => e.preventDefault()}>
                    <AddStaff services={services} roles={roles} staffId={id} triggerText={t("bookings.actionButtons.edit")} triggerClassName='flex p-2 items-center gap-2 cursor-pointer hover:bg-[var(--accent)] hover:rounded-l text-[14px]' />
                </DropdownMenuItem> */}
                <DropdownMenuItem className="cursor-pointer">
                    <Pencil size={20} color='black' /> {t("bookings.actionButtons.edit")}
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium cursor-pointer">
                    <Trash2 color="red" /> <span className="text-red-500">{ t("bookings.actionButtons.delete") }</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </CustomDropdown>
    )
}

export default StaffSettingMenu
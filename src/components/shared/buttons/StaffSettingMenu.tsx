import type { FunctionComponent } from "react"

import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Calendar, EllipsisVertical, Pencil, Trash2 } from "lucide-react"

import { t } from "i18next"

import CustomDropdown from "./CustomDropdown"

interface IStaffSettingMenu {
    id: string
}

const StaffSettingMenu: FunctionComponent<IStaffSettingMenu> = ({ id }) => {
    return (
        <CustomDropdown
            trigger={<EllipsisVertical className="cursor-pointer hover:bg-[#eff0f1] p-1 rounded-sm" size={30} />}
        >
            <DropdownMenuGroup onClick={() => console.log(id)}>
                <DropdownMenuItem className="font-medium cursor-pointer">
                    <Calendar fontWeight={800} color="black" /> { t("bookings.button.seeInCalendar") }
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium cursor-pointer">
                    <Pencil fontWeight={800} color="black" /> { t("bookings.actionButtons.edit") }
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium cursor-pointer">
                    <Trash2 color="red" /> <span className="text-red-500">{ t("bookings.actionButtons.delete") }</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </CustomDropdown>
    )
}

export default StaffSettingMenu
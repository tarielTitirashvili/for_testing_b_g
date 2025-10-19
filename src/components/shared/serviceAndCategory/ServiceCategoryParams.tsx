import type { FunctionComponent } from "react"

import { DropdownMenuGroup, DropdownMenuItem, } from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Trash2 } from "lucide-react"

import { useTranslation } from "react-i18next"

import CustomDropdown from "../buttons/CustomDropdown"
import BlockTable from "@/pages/business/spaces/components/BlockTable"
import AddService from "./AddService"

interface IServiceCategoryParams {
    bizType: 'service' | 'space'
    deleteService?: (id: number) => void
    id: number
}

const ServiceCategoryParams: FunctionComponent<IServiceCategoryParams> = ({ bizType, deleteService, id }) => {

    const { t } = useTranslation()

    return (
        <CustomDropdown
            trigger={<EllipsisVertical size={20} className="cursor-pointer" />}
        >
            <DropdownMenuGroup className="flex flex-col">
                <DropdownMenuItem asChild>
                    <AddService categories={[]} />
                </DropdownMenuItem>
                {bizType === 'space' && (
                    <DropdownMenuItem asChild>
                        <BlockTable />
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => deleteService?.(id)}>
                    <Trash2 color="#E81C1C" /> <span className="text-[#E81C1C]">{ t("bookings.actionButtons.delete") }</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </CustomDropdown>
    )
}

export default ServiceCategoryParams
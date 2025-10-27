import type { FunctionComponent } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { EllipsisVertical, Trash2, Users2 } from "lucide-react"

import { DropdownMenuItem, DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu"

import { t } from "i18next"

import { useSwitchSpaceStatusMutation } from "@/redux/business/space/spaceAPISlice"

import type { ISpace } from "../Spaces"

import AddSpace, { type IEditSpace } from "./AddSpace"

import CustomDropdown from "@/components/shared/buttons/CustomDropdown"
import CategoryStatusSwitch from "@/components/shared/customSwitch/CategoryStatusSwitch"

interface ICategory {
    isSystem: boolean
    id: string
    name: string
}

interface ISpaceCardProps {
    space: ISpace
    categories?: ICategory[]
    handleRemove?: (id: number) => void
    categoryId?: string
}

const SpaceCard: FunctionComponent<ISpaceCardProps> = ({ space, handleRemove, categories, categoryId }) => {

    // move up -----------
    const [switchSpaceStatus] = useSwitchSpaceStatusMutation()

    const handleChange = () => {

        const payload: IEditSpace = {
            serviceId: space.id,
            tableNumber: space.tableNumber,
            capacity: space.capacity,
            isAvailable: !space.isAvailable,
            isActive: !space.isActive,
            locales: [
                {
                    name: space.name,
                    description: space.name,
                    languageId: 1,
                },
            ],
        };

        switchSpaceStatus(payload)
    }
    // -----------

    return (
        <Card className={`max-w-[360px] p-3 rounded-sm flex flex-col gap-3 shadow-none transition-colors`}>
            <CardHeader className="flex justify-between p-0">
                <div className="category_name-desc">
                    <CardTitle className="font-medium">{ <>{String(space.name,)} {space.id}</> || 'name' }</CardTitle>
                    <CardDescription className="font-normal text-sm">{ 'desc' }</CardDescription>
                </div>
                <div className="category_params w-min cursor-pointer">
                    <CustomDropdown
                        trigger={<EllipsisVertical size={20} className="cursor-pointer" />}
                    >
                        <DropdownMenuRadioGroup className="flex flex-col p-1 gap-1">
                            <DropdownMenuItem asChild>
                                <AddSpace icon triggerText="შეცვლა" categoryId={categoryId} categories={categories ?? []} space={space} spaceId={space.id} />
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild onClick={() => handleRemove?.(space.id)}>
                                <span className="text-[#E81C1C] flex items-center text-sm gap-1.5 cursor-pointer">
                                    <Trash2 color="#E81C1C" size={20} />
                                    <span className="text-[#E81C1C]">{ t("bookings.actionButtons.delete") }</span>
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuRadioGroup>
                    </CustomDropdown>
                </div>
            </CardHeader>
            <CardContent className="flex gap-1 items-center justify-between p-0 w-full">
                <form
                    className="flex gap-1 items-center justify-between p-0 w-full"
                >
                    <div className="guests_count flex items-center gap-1">
                        <Users2 size={18} /> { space.capacity } { t("space.card.guestCnt") }
                    </div>
                    <div className="block_unblock-switch">
                        <CategoryStatusSwitch
                            checked={!space.isActive}
                            onChecked={handleChange}
                        />
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default SpaceCard
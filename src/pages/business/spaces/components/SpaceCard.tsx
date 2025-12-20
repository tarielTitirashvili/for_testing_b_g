import type { FunctionComponent } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { EllipsisVertical, Users2 } from "lucide-react"

import { DropdownMenuItem, DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu"

import { t } from "i18next"

import { useSwitchSpaceStatusMutation } from "@/redux/business/space/spaceAPISlice"

import type { ISpace } from "../Spaces"

import AddSpace, { type IEditSpaceFormData } from "./AddSpace"

import CustomDropdown from "@/components/shared/buttons/CustomDropdown"
import CategoryStatusSwitch from "@/components/shared/customSwitch/CategoryStatusSwitch"
import DeleteConfirmationModal from "@/components/shared/modal/DeleteConfirmationModal"

interface ICategory {
    isSystem: boolean
    id: string | number
    name: string
}

interface ISpaceCardProps {
    space: ISpace
    categories?: ICategory[]
    handleRemove: (id: number) => void
    categoryId?: string
    isDeleteProgress?: boolean
}

const SpaceCard: FunctionComponent<ISpaceCardProps> = ({ space, handleRemove, categories, categoryId, isDeleteProgress }) => {

    // move up -----------
    const [switchSpaceStatus] = useSwitchSpaceStatusMutation()

    const handleChange = () => {

        const payload: IEditSpaceFormData = {
            serviceId: space.id,
            tableNumber: space.tableNumber,
            minCapacity: space.minCapacity,
            maxCapacity: space.maxCapacity,
            isAvailable: !space.isAvailable,
            isActive: !space.isActive,
            categoryId: +categoryId!,
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

    console.log(space)

    return (
        <Card className={`max-w-[360px] p-3 rounded-sm flex flex-col gap-3 shadow-none transition-colors ${space.isActive || space.isAvailable ? "" : "bg-[#FDE9E9]"}`}>
            <CardHeader className="flex justify-between p-0">
                <div className="category_name-desc">
                    <CardTitle className="font-medium">{ <>{String(space.name,)}</> || 'name' }</CardTitle>
                    <CardDescription className="font-normal text-sm">{ 'desc' }</CardDescription>
                </div>
                <div className="category_params w-min cursor-pointer">
                    <CustomDropdown
                        trigger={<EllipsisVertical size={20} className="cursor-pointer" />}
                    >
                        <DropdownMenuRadioGroup className="flex flex-col p-1 gap-1">
                            <DropdownMenuItem asChild>
                                <AddSpace icon triggerText={t('bookings.button.edit')} categoryId={categoryId} categories={categories ?? []} space={space} spaceId={space.id} />
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild onClick={() => handleRemove?.(space.id)}>
                                <DeleteConfirmationModal
                                    itemId={space.id}
                                    handleDeleteItem={handleRemove}
                                    dropdownItem
                                    modalTitle={t('space.deleteModalt.title')}
                                    modalDescription={t('space.deleteModalt.description', {
                                        space: space.name
                                    })}
                                    isDeleteProgress={isDeleteProgress}
                                />
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
                        <Users2 size={18} /> {space.minCapacity} - {space.maxCapacity} {t("space.card.guestCnt")}
                    </div>
                    <div className="block_unblock-switch">
                        <CategoryStatusSwitch
                            className="bg-red-600 data-[state=checked]:bg-[#D61111]"
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
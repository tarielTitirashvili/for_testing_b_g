import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EllipsisVertical, Pencil, Trash2, Users2 } from "lucide-react"
import type { FunctionComponent } from "react"
import { t } from "i18next"
import CustomDropdown from "../buttons/CustomDropdown"
import { DropdownMenuItem, DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu"
import AddSpace from "./AddSpace"
import CategoryStatusSwitch from "../customSwitch/CategoryStatusSwitch"
import { useSwitchSpaceStatusMutation } from "@/redux/business/space/spaceAPISlice"

interface ICategory {
    isSystem: boolean
    id: string
    name: string
}

interface ISpace {
    id: number
    tableNumber: string
    capacity: number,
    isActive: boolean,
    isAvailable: boolean
    name: string
}

interface ISpaceCardProps {
    space: ISpace
    categories?: ICategory[]
    handleRemove?: (id: number) => void
    handleSpaceStatusSwitch?: (id: number) => void
    categoryId?: string
}

const SpaceCard: FunctionComponent<ISpaceCardProps> = ({ space, handleRemove, categories, categoryId }) => {

    const [switchSpaceStatus] = useSwitchSpaceStatusMutation()

    const handleChange = () => {

        const payload = {
            serviceId: space.id, // serviceId is required for edit
            tableNumber: space.tableNumber,
            capacity: space.capacity,
            isAvailable: space.isAvailable, // keep current availability
            isActive: !space.isActive, // toggle active status
            locales: [
                {
                    name: space.name,
                    description: space.name,
                    languageId: 1,
                },
            ],
        };

        switchSpaceStatus(payload)

        console.log(JSON.stringify(payload,null,2))
    }

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
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <span className="flex items-center text-sm gap-1.5 cursor-pointer">
                                    <Pencil />
                                    <AddSpace triggerText="შეცვლა" categoryId={categoryId} categories={categories ?? []} space={space} spaceId={space.id} />
                                </span>
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

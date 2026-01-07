import type { FunctionComponent } from "react"

import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

import { t } from "i18next"

import { Skeleton } from "@/components/ui/skeleton"

import EntityList from "../modals/EntityList"
import CustomDropdown from "../buttons/CustomDropdown"
import PrimaryPressable from "../buttons/PrimaryPressable"

interface ICategory {
    isSystem: boolean
    id: string | number
    name: string
}

interface EditComponentProps {
  icon?: boolean;
  categoryId: string;
}

interface IAddItemProps {
  categories: ICategory[];
  triggerText?: string
}

interface IBusinessHeader {
    serviceCategories: ICategory[]
    removeCategory: (id: number) => void
    EditComponent?: React.ComponentType<EditComponentProps>
    AddItemComponent: React.ComponentType<IAddItemProps>
    AddCategoryComponent?: React.ComponentType<{ triggerText?: string }>
    isSuccess: boolean
    isLoading: boolean
    isError: boolean
    isDeleteProgress?: boolean
    canDelete: boolean
}


const BusinessHeader: FunctionComponent<IBusinessHeader> = ({ serviceCategories, removeCategory, AddItemComponent, AddCategoryComponent, EditComponent, isError, isLoading, isSuccess, isDeleteProgress, canDelete }) => {
    
    if (isLoading) {
        return (
            <div className="flex justify-between gap-6">
                {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="h-11 w-full"></Skeleton>
                ))}
            </div>
        )
    }
    
    if (isError) {
        return (
            <div className="text-red-500">{t('business.texts.thereWasError')}</div>
        )
    }

    const filteredCategories = serviceCategories.slice(1)

    return (
        <div className="flex justify-between flex-col lg:flex-row gap-3 lg:gap-0">
            <TabsList className="h-[50px] bg-transparent flex flex-row justify-center w-full lg:w-max">
                {isSuccess && serviceCategories.length === 0 ? (
                    <p>{t('business.texts.categoryNotFount')}</p>
                ): (
                    serviceCategories.map((service) => (
                        <TabsTrigger key={service.id} value={service.id.toString()} className="px-3 data-[state=active]:text-[#AE5700] data-[state=active]:bg-[#FEF2E6] data-[state=active]:shadow-none">
                            {service.name}
                        </TabsTrigger>
                    )
                ))}
            </TabsList>
            <div className="params_side flex items-center gap-3 lg:flex-row">
                <p className="relative w-full">
                    <Input className="2xl:w-[300px] h-[40px] pl-[30px]" placeholder={'Search'} />
                    <Search className="absolute top-1/2 left-[5px] -translate-y-1/2" color="#AEAEAE" />
                </p>
                <EntityList
                    label={t('service.header.categories')}
                    entities={filteredCategories}
                    primaryButtonText="Save"
                    title={t('service.header.category.header')}
                    description={t('service.header.category.description')}
                    removeItem={removeCategory}
                    EditComponent={EditComponent}
                    isDeleteProgress={isDeleteProgress}
                    canDelete={canDelete}
                />
                <CustomDropdown
                    trigger={<PrimaryPressable> <Plus /> {t("bookings.button.add")}</PrimaryPressable>}
                >
                    <DropdownMenuGroup className="flex flex-col gap-2 p-0.5">
                        <DropdownMenuItem asChild>
                            {AddItemComponent && <AddItemComponent triggerText={t('business.business.place.text')} categories={serviceCategories} />}
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            { AddCategoryComponent && <AddCategoryComponent triggerText={t('bookings.button.category')} /> }
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </CustomDropdown>
            </div>
        </div>
    )
}

export default BusinessHeader
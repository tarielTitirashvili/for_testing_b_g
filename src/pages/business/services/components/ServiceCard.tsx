import type { FunctionComponent } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenuItem, DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu";

import { Clock, DollarSign, EllipsisVertical, ImageOff } from "lucide-react"

import type { TService } from "../Services";
import { t } from "i18next";

import AddService from "./AddService";

import DeleteConfirmationModal from "@/components/shared/modal/DeleteConfirmationModal";
import CustomDropdown from "@/components/shared/buttons/CustomDropdown";

interface ICategory {
    isSystem: boolean
    id: string | number
    name: string
}

interface IServiceCardProps {
    serviceId: number
    service: TService
    handleRemove: (id: number) => void
    categories: ICategory[]
    categoryId: string
    isDeleteProgress?: boolean
}

const ServiceCard: FunctionComponent<IServiceCardProps> = ({ serviceId, service, categories, handleRemove, categoryId, isDeleteProgress }) => {
    return (
        <Card className="flex flex-row justify-between gap-0 w-full shadow-none border-2 rounded-md p-3 grow">
            <div className="service_info-full flex gap-3">
                <CardHeader className="h-[80px] w-[80px] p-0">
                    {"file" in service && service.file ? (
                        <img
                            src={service.file.url}
                            alt="Service"
                            className="h-[80px] w-[80px] rounded-md object-cover"
                        />
                    ) : (
                        <span><ImageOff className='w-18 h-18' /></span>
                    )}
                </CardHeader>

                <CardContent className="flex flex-col p-0">
                    <div className="service_name-desc flex flex-col flex-1 gap-1">
                        <CardTitle>{ service.name }</CardTitle>
                        <CardDescription className="text-sm text-[#6C6C6C]">{ service.name }</CardDescription>
                    </div>
                    <div className="service_price-time flex items-center  gap-2">
                        <span className="text-[#EF7800] flex items-center text-lg font-semibold">
                            <DollarSign size={20} strokeWidth={3} />{ service.price }
                        </span>
                        <span className="text-[#6C6C6C] flex items-center text-sm font-medium gap-1">
                            <Clock size={14} strokeWidth={2} />{ service.durationInMinutes }
                        </span>
                    </div>
                </CardContent>
            </div>
            <div className="service_param-btn w-max cursor-pointer">
                <CustomDropdown
                    trigger={<EllipsisVertical size={20} className="cursor-pointer" />}
                >
                    <DropdownMenuRadioGroup className="flex flex-col p-1 gap-1">
                        <DropdownMenuItem asChild>
                            <AddService icon categories={categories && categories} service={service} serviceId={serviceId} categoryId={categoryId} />
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild onClick={() => handleRemove?.(service.id)}>
                            <DeleteConfirmationModal
                                itemId={service.id}
                                handleDeleteItem={handleRemove}
                                dropdownItem
                                modalTitle={t('services.deleteModalt.title')}
                                modalDescription={t('services.deleteModalt.description', {
                                    service: `${service.name}`
                                })}
                                isDeleteProgress={isDeleteProgress}
                            />
                        </DropdownMenuItem>
                    </DropdownMenuRadioGroup>
                </CustomDropdown>
            </div>
        </Card>
    )
}

export default ServiceCard
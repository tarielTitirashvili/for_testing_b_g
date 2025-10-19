import type { FunctionComponent } from "react"

import { TabsContent } from "@/components/ui/tabs"

import ServiceCard from "./ServiceCard"

interface IService {
    id: number,
    price: number,
    durationInMinutes: number,
    hasAssignedStaff: boolean,
    name: string
}

interface ICategory {
    isSystem: boolean
    id: string
    name: string
}   

interface IServiceCategoryBodyProps {
    services: IService[]
    categoryId: string
    categories: ICategory[]
    handleServiceRemove?: (id: number) => void
}

const BusinessServiceBody: FunctionComponent<IServiceCategoryBodyProps> = ({ services, categories, categoryId, handleServiceRemove }) => {    

    return (
        <div className='flex justify-start gap-6 flex-wrap'>
            
            {services?.map(service => (
                <TabsContent key={service.id} value={categoryId} className='max-w-[360px] w-full'>
                    <ServiceCard
                        serviceId={service.id}
                        service={service}
                        handleRemove={handleServiceRemove}
                        categories={categories}
                        categoryId={categoryId}

                    />
                </TabsContent>
            ))}
        
        </div>
    )
}

export default BusinessServiceBody
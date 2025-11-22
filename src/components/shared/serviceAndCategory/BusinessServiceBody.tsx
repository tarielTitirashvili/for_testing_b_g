import type { FunctionComponent } from "react"

import { TabsContent } from "@/components/ui/tabs"

import type { TService } from "@/pages/business/services/Services"

import { Skeleton } from "@/components/ui/skeleton"

import { useTranslation } from 'react-i18next'

import ServiceCard from "../../../pages/business/services/components/ServiceCard"
import EmptyResponse from '../emptyResponse'

import Loader from "../loader"

interface ICategory {
    isSystem: boolean
    id: string
    name: string
}   

interface IServiceCategoryBodyProps {
    services: TService[]
    categoryId: string
    categories: ICategory[]
    handleServiceRemove: (id: number) => void
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    isDeleteProgress?: boolean
}

const BusinessServiceBody: FunctionComponent<IServiceCategoryBodyProps> = ({ services, categories, categoryId, handleServiceRemove, isLoading, isError, isSuccess, isDeleteProgress }) => {    
    
    const {t} = useTranslation() 
    
    if (isLoading) {
        return (
            <div className="flex justify-start gap-6 flex-wrap">
                {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="max-w-[360px] w-full h-24 p-3 rounded-sm flex flex-col items-center justify-center gap-3 shadow-none transition-colors">
                        <Loader />
                    </Skeleton>
                ))}
            </div>
        )
    }    

    if (isError) {
        return <p className="text-red-500">{t('business.texts.thereWasError')}</p>
    }

    if (isSuccess && services.length === 0) {
        return <EmptyResponse /> 
    }

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
                        isDeleteProgress={isDeleteProgress}
                    />
                </TabsContent>
            ))}
        
        </div>
    )
}

export default BusinessServiceBody
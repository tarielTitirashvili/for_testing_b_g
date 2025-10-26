import type { FunctionComponent } from "react"

import { TabsContent } from "@/components/ui/tabs"

import type { ISpace } from "@/pages/business/spaces/Spaces"

import SpaceCard from "../../../pages/business/spaces/components/SpaceCard"
import Loader from "../loader"
import { Skeleton } from "@/components/ui/skeleton"

interface ICategory {
    isSystem: boolean
    id: string
    name: string
}


interface ISpaceBodyProps {
    spaces: ISpace[]
    categoryId: string
    categories?: ICategory[]
    removeSpace?: (id: number) => void
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean
}

const BusinessSpaceBody: FunctionComponent<ISpaceBodyProps> = ({ categoryId, spaces, categories, removeSpace, isError, isLoading, isSuccess }) => {
    
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
        return <p className="text-red-500">Failed to load spaces.</p>
    }

    if (isSuccess && spaces.length === 0) {
        return <p>No spaces found.</p>
    }

    return (
        <div className='flex justify-start gap-6 flex-wrap'>
            {spaces?.map(space => (
                <TabsContent key={space.id} value={categoryId} className='max-w-[360px] w-full'>
                    <SpaceCard
                        categoryId={categoryId}
                        handleRemove={removeSpace}
                        categories={categories ?? []}
                        space={space}
                    />
                </TabsContent>
            ))}
        
        </div>
    )
}

export default BusinessSpaceBody
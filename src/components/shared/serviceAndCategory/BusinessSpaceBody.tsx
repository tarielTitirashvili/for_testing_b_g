import type { FunctionComponent } from "react"

import { TabsContent } from "@/components/ui/tabs"

import type { ISpace } from "@/pages/business/spaces/Spaces"

import SpaceCard from "../../../pages/business/spaces/components/SpaceCard"

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
}

const BusinessSpaceBody: FunctionComponent<ISpaceBodyProps> = ({ categoryId, spaces, categories, removeSpace }) => {
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
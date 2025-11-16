import { useEffect, type FunctionComponent } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { Tabs } from "@/components/ui/tabs";

import { useDeleteTableCategoryMutation, useGetTableCategoryQuery } from "@/redux/business/category/categoryAPISlice";
import { useDeleteSpaceMutation, useGetSpacesQuery } from "@/redux/business/space/spaceAPISlice";

import BusinessHeader from "@/components/shared/serviceAndCategory/BusinessHeader";
import BusinessSpaceBody from "@/components/shared/serviceAndCategory/BusinessSpaceBody";

import AddSpaceCategory from "./components/AddSpaceCategory";
import AddSpace from "./components/AddSpace";
import Loader from '@/components/shared/loader'

export interface ISpace {
    id: number
    tableNumber: string
    capacity: number,
    isActive: boolean,
    isAvailable: boolean
    name: string,
    locales: {
        name: string,
        languageId: number,
        description: string
    }[]
}

const Spaces: FunctionComponent = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    // space category
    const { 
        data: categoryList = [], 
        isSuccess: isCategoryListSuccess, 
        isLoading:isCategoryLoading,
        isError:isCategoryError 
    } = useGetTableCategoryQuery()
    const [deleteTableCategory] = useDeleteTableCategoryMutation()
    const shouldSkipGetSpacesQuery = !id

    // spaces
    const { 
        data: spaceList,
        isSuccess: isSpaceListSuccess,
        isLoading: isSpaceListLoading,
        isFetching: isSpaceListFetching,
        isError: isSpaceListError
    } = useGetSpacesQuery(+id! || undefined, { skip: shouldSkipGetSpacesQuery})
    
    const [deleteSpace] = useDeleteSpaceMutation()    

    useEffect(() => {
        if (shouldSkipGetSpacesQuery && categoryList.length) {
            navigate(`/spaces/${categoryList[0].id}`, { replace: true })
        }
    }, [id, categoryList, navigate])

    return (
        <div className="bg-white p-6 rounded-sm">
            <Loader loading={isSpaceListFetching} >
                <Tabs
                    value={id}
                    defaultValue={categoryList?.[0]?.id?.toString() ?? '/spaces'}
                    onValueChange={(tabValue) => navigate(`/spaces/${tabValue}`)}
                >
                        <BusinessHeader
                            serviceCategories={categoryList ?? []}
                            removeCategory={deleteTableCategory}
                            AddCategoryComponent={AddSpaceCategory}
                            // EditComponent={AddSpaceCategory}
                            AddItemComponent={AddSpace}
                            isSuccess={isCategoryListSuccess}
                            isLoading={isCategoryLoading}
                            isError={isCategoryError}
                            />
                        
                        <BusinessSpaceBody
                            categories={categoryList}
                            categoryId={String(id)}
                            spaces={spaceList ?? []}
                            shouldSkipGetSpacesQuery={shouldSkipGetSpacesQuery}
                            removeSpace={(id) => deleteSpace(id)}
                            isSuccess={isSpaceListSuccess}
                            isLoading={isSpaceListLoading}
                            isCategoryLoading={isCategoryLoading}
                            isError={isSpaceListError}
                        />
                </Tabs>
            </Loader>
        </div>
    )
}

export default Spaces
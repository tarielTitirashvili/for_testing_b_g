import { useEffect, type FunctionComponent } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { Tabs } from "@/components/ui/tabs";

import { useDeleteTableCategoryMutation, useGetTableCategoryQuery } from "@/redux/business/category/categoryAPISlice";
import { useDeleteSpaceMutation, useGetSpacesQuery } from "@/redux/business/space/spaceAPISlice";

import BusinessHeader from "@/components/shared/serviceAndCategory/BusinessHeader";
import BusinessSpaceBody from "@/components/shared/serviceAndCategory/BusinessSpaceBody";

import AddSpaceCategory from "./components/AddSpaceCategory";
import AddSpace from "./components/AddSpace";

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

    // spaces
    const { 
        data: spaceList,
        isSuccess: isSpaceListSuccess,
        isLoading: isSpaceListLoading,
        isError: isSpaceListError
    } = useGetSpacesQuery(+id! || undefined, { skip: !id})
    const [deleteSpace] = useDeleteSpaceMutation()    

    useEffect(() => {
        if (!id && categoryList.length) {
            navigate(`/spaces/${categoryList[0].id}`, { replace: true })
        }
    }, [id, categoryList, navigate])

    return (
        <div className="bg-white p-6 rounded-sm">
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
                    removeSpace={(id) => deleteSpace(id)}
                    isSuccess={isSpaceListSuccess}
                    isLoading={isSpaceListLoading}
                    isError={isSpaceListError}
                />
            </Tabs>
        </div>
    )
}

export default Spaces
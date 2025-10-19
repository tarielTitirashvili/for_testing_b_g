import { type FunctionComponent } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { Tabs } from "@/components/ui/tabs";


import BusinessHeader from "@/components/shared/serviceAndCategory/BusinessHeader";
import AddSpaceCategory from "@/components/shared/serviceAndCategory/AddSpaceCategory";
import AddSpace from "@/components/shared/serviceAndCategory/AddSpace";
import BusinessSpaceBody from "@/components/shared/serviceAndCategory/BusinessSpaceBody";
import { useDeleteTableCategoryMutation, useGetTableCategoryQuery } from "@/redux/business/category/categoryAPISlice";
import { useDeleteSpaceMutation, useGetSpacesQuery } from "@/redux/business/space/spaceAPISlice";


export interface ISpace {
    id: number
    tableNumber: string
    capacity: number,
    isActive: boolean,
    isAvailable: boolean
    name: string
}


const Spaces: FunctionComponent = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    // space category
    const { data: categoryList } = useGetTableCategoryQuery()
    const [deleteTableCategory] = useDeleteTableCategoryMutation()

    // spaces
    const { data: spaceList } = useGetSpacesQuery(+id! || undefined, {
        skip: id === undefined
    })
    const [deleteSpace] = useDeleteSpaceMutation()

    return (
        <div className="bg-white p-6 rounded-sm">
            <Tabs
                value={id}
                defaultValue={categoryList && categoryList[0].id}
                onValueChange={(tabValue) => navigate(`/spaces/${tabValue}`)}
            >
                <BusinessHeader
                    serviceCategories={categoryList ?? []}
                    removeCategory={deleteTableCategory}
                    AddCategoryComponent={AddSpaceCategory}
                    // EditComponent={AddSpaceCategory}
                    AddItemComponent={AddSpace}
                />
                
                <BusinessSpaceBody
                    categories={categoryList}
                    categoryId={String(id)}
                    spaces={spaceList ?? []}
                    removeSpace={(id) =>
                        deleteSpace(id)
                            .unwrap()
                            .then(() => console.log("Deleted space:", id))
                            .catch((err) => console.error("Delete failed:", err))
                    }
                />
            </Tabs>
        </div>
    )
}

export default Spaces

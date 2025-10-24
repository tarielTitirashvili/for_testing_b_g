import { useEffect, type FunctionComponent } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { Tabs } from "@/components/ui/tabs";

import BusinessHeader from "@/components/shared/serviceAndCategory/BusinessHeader";
import BusinessServiceBody from "@/components/shared/serviceAndCategory/BusinessServiceBody";
import AddCategory from "@/pages/business/services/components/AddCategory";
import AddService from "@/pages/business/services/components/AddService";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "@/redux/business/category/categoryAPISlice";
import { useGetServicesQuery, useRemoveServiceMutation } from "@/redux/business/service/serviceAPISlice";

const Menu: FunctionComponent = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: categories = [] } = useGetCategoriesQuery();
    const { data: services = [] } = useGetServicesQuery(+id!, { skip: !id });

    const [deleteCategory] = useDeleteCategoryMutation()
    const [deleteService] = useRemoveServiceMutation()
    
    const removeCategory = async (id: string) => {
        deleteCategory(id)
    }

    useEffect(() => {
        if (!id && categories.length) {
            navigate(`/menu/${categories[0].id}`, { replace: true })
        }
    }, [id, categories, navigate])

    return (
        <div className="bg-white p-6 rounded-sm">
            <Tabs
                value={id}
                defaultValue={categories[0]?.id.toString()}
                onValueChange={(tabValue) => navigate(`/menu/${tabValue}`)}
            >
                <BusinessHeader
                    serviceCategories={categories}
                    AddItemComponent={AddService}
                    removeCategory={removeCategory}
                    EditComponent={AddCategory}
                    AddCategoryComponent={AddCategory}
                />
                
                <BusinessServiceBody
                    categories={categories}
                    handleServiceRemove={deleteService}
                    categoryId={String(id)}
                    services={services}
                />
            </Tabs>
        </div>
    )
}

export default Menu
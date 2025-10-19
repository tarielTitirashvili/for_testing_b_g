import { type FunctionComponent } from "react"

import { Tabs } from "@/components/ui/tabs"

import { useNavigate, useParams } from "react-router-dom";

import BusinessHeader from "@/components/shared/serviceAndCategory/BusinessHeader";
import BusinessServiceBody from "@/components/shared/serviceAndCategory/BusinessServiceBody";
import AddCategory from "@/components/shared/serviceAndCategory/AddCategory";
import AddService from "@/components/shared/serviceAndCategory/AddService";

import { useDeleteCategoryMutation, useGetCategoriesQuery } from "@/redux/business/category/categoryAPISlice";
import { useGetServicesQuery, useRemoveServiceMutation } from "@/redux/business/service/serviceAPISlice";


export interface IService {
    id: number,
    price: number,
    durationInMinutes: number,
    hasAssignedStaff: boolean,
    name: string
}

export interface ICategory {
    isSystem: boolean
    id: string
    name: string
}

export interface ICreateCategory {
    name: string,
    languageId: number
}

export interface IEditCategory {
    categoryId: number,
    categoryLocales: [
        {
            name: string,
            languageId: number
        }
    ]
}

const Services: FunctionComponent = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: categories = [] } = useGetCategoriesQuery();
    const { data: services = [] } = useGetServicesQuery(+id!);

    const [deleteCategory] = useDeleteCategoryMutation()
    const [deleteService] = useRemoveServiceMutation()
 
    const removeCategory = async (id: string) => {
        deleteCategory(id)
    }

    return (
        <div className="bg-white p-6 rounded-sm">
            <Tabs
                value={id}
                defaultValue={categories[0]?.id.toString()}
                onValueChange={(tabValue) => navigate(`/services/${tabValue}`)}
            >
                <BusinessHeader
                    serviceCategories={categories}
                    removeCategory={removeCategory}
                    EditComponent={AddCategory} 
                    AddItemComponent={AddService}
                    AddCategoryComponent={AddCategory}
                />

                <BusinessServiceBody
                    services={services}
                    categoryId={String(id)}
                    categories={categories}
                    handleServiceRemove={deleteService}
                />
            </Tabs>
        </div>
    )
}

export default Services
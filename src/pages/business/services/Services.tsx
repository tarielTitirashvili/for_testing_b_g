import { useEffect, type FunctionComponent } from "react"

import { Tabs } from "@/components/ui/tabs"

import { useNavigate, useParams } from "react-router-dom";

import { useDeleteCategoryMutation, useGetCategoriesQuery } from "@/redux/business/category/categoryAPISlice";
import { useGetServicesQuery, useRemoveServiceMutation } from "@/redux/business/service/serviceAPISlice";

import BusinessHeader from "@/components/shared/serviceAndCategory/BusinessHeader";
import BusinessServiceBody from "@/components/shared/serviceAndCategory/BusinessServiceBody";
import AddCategory from "./components/AddCategory";
import AddService from "./components/AddService";

export interface IServiceBase {
    id: number,
    price: number,
    durationInMinutes: number,
    hasAssignedStaff: boolean,
    name: string
}

interface IServiceWithFile extends IServiceBase {
    file: {
        id: number,
        url: string,
        isProfile: boolean
    }
}

interface IServiceWithFiles extends IServiceBase {
    files: {
        id: number,
        url: string,
        isProfile: boolean
    }[]
}

export type TService = IServiceWithFiles | IServiceWithFile


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
    const { data: services = [] } = useGetServicesQuery(+id!, { skip: !id });

    const [deleteCategory] = useDeleteCategoryMutation()
    const [deleteService] = useRemoveServiceMutation()
 
    const removeCategory = async (id: string) => {
        deleteCategory(id)
    }

    useEffect(() => {
        if (!id && categories.length) {
            navigate(`/services/${categories[0].id}`, { replace: true })
        }
    }, [id, categories, navigate])

    return (
        <div className="bg-white p-6 rounded-sm">
            <Tabs
                value={id}
                defaultValue={categories[0]?.id.toString()}
                onValueChange={(tabValue) => navigate(`/services/${tabValue}`)}
            >
                <BusinessHeader
                    serviceCategories={categories} // categories
                    removeCategory={removeCategory} // remove category
                    AddCategoryComponent={AddCategory} // add category
                    EditComponent={AddCategory} // edit category
                    AddItemComponent={AddService} // add service
                />

                <BusinessServiceBody
                    services={services} // services
                    categoryId={String(id)} // service id
                    handleServiceRemove={deleteService} // remove service
                    categories={categories} // categories
                />
            </Tabs>
        </div>
    )
}

export default Services
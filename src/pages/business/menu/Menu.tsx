import { useEffect, type FunctionComponent } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { Tabs } from "@/components/ui/tabs";

import { useDeleteCategoryMutation, useGetCategoriesQuery } from "@/redux/business/category/categoryAPISlice";
import { useGetServicesQuery, useRemoveServiceMutation } from "@/redux/business/service/serviceAPISlice";

import BusinessHeader from "@/components/shared/serviceAndCategory/BusinessHeader";
import BusinessServiceBody from "@/components/shared/serviceAndCategory/BusinessServiceBody";
import AddCategory from "@/pages/business/services/components/AddCategory";
import AddService from "@/pages/business/services/components/AddService";
import Loader from '@/components/shared/loader'
import createToast from '@/lib/createToast'
import { useTranslation } from 'react-i18next'

const Menu: FunctionComponent = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const {
        data: categories = [],
        isSuccess: isCategoryListSuccess, 
        isLoading:isCategoryLoading,
        isError:isCategoryError 
    } = useGetCategoriesQuery()

    const {
        data: services = [],
        isSuccess: isServicesSuccess,
        isLoading: isServicesLoading,
        isFetching: isServicesFetching,
        isError: isServicesError
    } = useGetServicesQuery(id! ? +id : undefined, { skip: !id });

    const { t } = useTranslation()

    const [deleteCategory, {isLoading: isDeleteCategoryProgress, isSuccess: isDeleteCategorySuccess}] = useDeleteCategoryMutation()
    const [deleteService] = useRemoveServiceMutation()
    
    const removeCategory = async (id: number) => {
        deleteCategory(id)
    }
    
    useEffect(() => {
        if (!id && categories.length) {
            navigate(`/menu/${categories[0].id}`, { replace: true })
        }
    }, [id, categories, navigate])

    useEffect(()=>{
        if(isDeleteCategorySuccess){
            createToast.success(t('business.successMessage.categoryWasSuccessfullyDeleted'))
        }
    },[isDeleteCategorySuccess])

    return (
        <div className="bg-white p-6 rounded-sm">
            <Loader loading={isServicesFetching} >
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
                        isSuccess={isCategoryListSuccess}
                        isError={isCategoryError}
                        isLoading={isCategoryLoading}
                        isDeleteProgress={isDeleteCategoryProgress}
                    />
                    
                    <BusinessServiceBody
                        categories={categories}
                        handleServiceRemove={deleteService}
                        categoryId={String(id)}
                        services={services}
                        isLoading={isServicesLoading}
                        isError={isServicesError}
                        isSuccess={isServicesSuccess}
                        isDeleteProgress={isDeleteCategoryProgress}
                    />
                </Tabs>
            </Loader>
        </div>
    )
}

export default Menu
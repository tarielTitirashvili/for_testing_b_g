import { apiSlice } from "@/redux/APISlice";

import type { ICategory, ICreateCategory, IEditCategory } from "@/pages/business/services/Services";
import type { IAddCategoryFormData } from "@/pages/business/services/components/AddCategory";

interface ICategoryById {
    id: number,
    isSystem: boolean,
    locales: {
        name: string,
        languageId: number
    }[]
}

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // category
        getCategories: builder.query<ICategory[], void>({
            query: () => ({
                url: "/category",
                method: "GET",
            }),
        }),

        getCategoryById: builder.query<ICategoryById, number | undefined>({
            query: (categoryId) => ({
                url: `/category/${categoryId}`,
                method: "GET"
            })
        }),

        createCategory: builder.mutation<void, ICreateCategory[]>({
            query: (payload) => ({
                url: '/category',
                method: "POST",
                data: payload
            })
        }),

        editCategory: builder.mutation<void, IEditCategory>({
            query: (payload) => ({
                url: "/category",
                method: "PUT",
                data: payload
            })
        }),

        deleteCategory: builder.mutation<void, string>({
            query: (categoryId) => ({
                url: '/category',
                method: 'DELETE',
                data: [
                    categoryId
                ]
            })
        }),

        // table category
        getTableCategory: builder.query<ICategory[], void>({
            query: () => ({
                url: '/tablecategory',
                method: 'GET'
            })
        }),

        getTableCategoryById: builder.query<IAddCategoryFormData, number | undefined>({
            query: (tableCategoryId) => ({
                url: `/tablecategory/${tableCategoryId}`,
                method: 'GET'
            })
        }),

        createTableCategory: builder.mutation<void, ICreateCategory[]>({
            query: (tableCategoryData) => ({
                url: '/tablecategory',
                method: 'POST',
                data: tableCategoryData
            })
        }),

        editTableCategory: builder.mutation<void, IEditCategory>({
            query: (payload) => ({
                url: '/tablecategory',
                method: "PUT",
                data: payload
            })
        }),

        deleteTableCategory: builder.mutation<void, string>({
            query: (tableCategoryData) => ({
                url: '/tablecategory',
                method: 'DELETE',
                data: [
                    tableCategoryData
                ]
            })
        })

    })
})

export const {
    // category
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useEditCategoryMutation,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,

    // table category
    useGetTableCategoryQuery,
    useGetTableCategoryByIdQuery,
    useDeleteTableCategoryMutation,
    useCreateTableCategoryMutation
} = categoryApiSlice
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
            providesTags: ['Category']
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
            }),
            invalidatesTags: ['Category']
        }),

        editCategory: builder.mutation<void, IEditCategory>({
            query: (payload) => ({
                url: "/category",
                method: "PUT",
                data: payload
            }),
            invalidatesTags: ['Category']
        }),

        deleteCategory: builder.mutation<void, string>({
            query: (categoryId) => ({
                url: '/category',
                method: 'DELETE',
                data: [
                    categoryId
                ]
            }),
            invalidatesTags: ['Category']
        }),

        // table category
        getTableCategory: builder.query<ICategory[], void>({
            query: () => ({
                url: '/tablecategory',
                method: 'GET'
            }),
            providesTags: ['SpaceCategory']
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
            }),
            invalidatesTags: ['SpaceCategory']
        }),

        editTableCategory: builder.mutation<void, IEditCategory>({
            query: (payload) => ({
                url: '/tablecategory',
                method: "PUT",
                data: payload
            }),
            invalidatesTags: ['SpaceCategory']
        }),

        deleteTableCategory: builder.mutation<void, string>({
            query: (tableCategoryData) => ({
                url: '/tablecategory',
                method: 'DELETE',
                data: [
                    tableCategoryData
                ]
            }),
            invalidatesTags: ['SpaceCategory']
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
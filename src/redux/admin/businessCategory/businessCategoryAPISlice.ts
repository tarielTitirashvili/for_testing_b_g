import { apiSlice } from "@/redux/APISlice";

import type { IBusinessCategory } from "@/pages/admin/businessCategories/BusinessCategories";
import type { IAddBusinessCategoryFormData, IEditBusinessCategoryFormData } from "@/pages/admin/businessCategories/components/AddBusinessCategory";

interface IBusinessCategoryById {
    id: number,
    businessCategoryTypeId: number,
    locales: {
        name: string,
        languageId: number
    }[]
}

interface IDeleteBusinessCategory {
    id: number
}

export const businessCategoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllBusinessCategories: builder.query<IBusinessCategory[], void>({
            query: () => ({
                url: "/admin/get-business-categories",
                method: "GET"
            }),
            providesTags: ['BusinessCategory']
        }),

        getBusinessCategoryById: builder.query<IBusinessCategoryById, number | undefined>({
            query: (businessCategoryId) => ({
                url: `/admin/get-business-category/${businessCategoryId}`,
                method: "GET"
            })
        }),

        createBusinessCategory: builder.mutation<void, IAddBusinessCategoryFormData>({
            query: (data) => ({
                url: "/admin/add-business-category",
                method: "POST",
                data
            }),
            invalidatesTags: ['BusinessCategory']
        }),

        editBusinessCategory: builder.mutation<void, IEditBusinessCategoryFormData>({
            query: (data) => ({
                url: "/admin/edit-business-category",
                method: "PUT",
                data
            }),
            invalidatesTags: ['BusinessCategory']
        }),

        deleteBusinessCategory: builder.mutation<void, IDeleteBusinessCategory | undefined>({
            query: (data) => ({
                url: "/admin/delete-business-category",
                method: "PUT",
                data
            }),
            invalidatesTags: ['BusinessCategory']
        })

    })
})

export const {
    useGetAllBusinessCategoriesQuery,
    useGetBusinessCategoryByIdQuery,
    useCreateBusinessCategoryMutation,
    useEditBusinessCategoryMutation,
    useDeleteBusinessCategoryMutation
} = businessCategoryApiSlice
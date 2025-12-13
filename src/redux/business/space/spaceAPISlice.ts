import type { IAddSpaceFormData, IEditSpaceFormData, } from "@/pages/business/spaces/components/AddSpace";
import type { ISpace } from "@/pages/business/spaces/Spaces";
import { apiSlice } from "@/redux/APISlice";

export interface ISpaceResponse {
  categoryId: number
  categoryLocales: { name: string; languageId: number }[]
  tableNumber?: string
  minCapacity: number,
  maxCapacity: number,
  isAvailable?: boolean
  isActive?: boolean
}

export const spaceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSpaces: builder.query<ISpace[], number | undefined>({
            query: (categoryId) => ({
                url: `/tablecategoryservices/services/${categoryId}`,
                method: "GET",
            }),
            providesTags: ['Space'],
        }),

        getSpaceById: builder.query<ISpaceResponse, number | undefined>({
            query: (serviceId) => ({
                url: `/tablecategoryservices/${serviceId}`,
                method: 'GET'
            })
        }),

        editSpace: builder.mutation<void, IEditSpaceFormData>({
            query: (data) => ({
                url: '/tablecategoryservices',
                method: 'PUT',
                data: data,
            }),
            // invalidatesTags: ['Space'],
            // //! call this invalidation inside component after success to prevent rerenders aff parent components and show success message
        }),

        deleteSpace: builder.mutation<void, number | undefined>({
            query: (spaceServiceId) => ({
                url: `/tablecategoryservices/${spaceServiceId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Space'],
        }),

        createSpace: builder.mutation<void, IAddSpaceFormData>({
            query: (data) => ({
                url: '/tablecategoryservices',
                method: 'POST',
                data
            }),
            // invalidatesTags: ['Space'],
            // //! call this invalidation inside component after success to prevent rerenders aff parent components and show success message
        }),
        
        switchSpaceStatus: builder.mutation<void, IEditSpaceFormData>({
            query: (data) => ({
                url: "/tablecategoryservices",
                method: "PUT",
                data
            }),
            invalidatesTags: ['Space'],
        })

    })
})

export const { 
    useGetSpacesQuery,
    useGetSpaceByIdQuery,
    useEditSpaceMutation,
    useCreateSpaceMutation,
    useDeleteSpaceMutation,
    useSwitchSpaceStatusMutation
} = spaceApiSlice
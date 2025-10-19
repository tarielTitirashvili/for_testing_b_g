import type { IAddSpaceFormData, IEditSpace } from "@/components/shared/serviceAndCategory/AddSpace";
import type { ISpace } from "@/pages/business/spaces/Spaces";
import { apiSlice } from "@/redux/APISlice";

export interface ISpaceResponse {
  categoryId: number
  categoryLocales: { name: string; languageId: number }[]
  tableNumber?: string
  capacity?: number
  isAvailable?: boolean
  isActive?: boolean
}

export const spaceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSpaces: builder.query<ISpace[], number | undefined>({
            query: (categoryId) => ({
                url: `/tablecategoryservices/services/${categoryId}`,
                method: "GET",
            })
        }),

        getSpaceById: builder.query<ISpaceResponse, number | undefined>({
            query: (serviceId) => ({
                url: `/tablecategoryservices/${serviceId}`,
                method: 'GET'
            })
        }),

        editSpace: builder.mutation<void, IEditSpace>({
            query: (data) => ({
                url: '/tablecategoryservices',
                method: 'PUT',
                data: data,
            })
        }),

        deleteSpace: builder.mutation<void, number | undefined>({
            query: (spaceServiceId) => ({
                url: `/tablecategoryservices/${spaceServiceId}`,
                method: 'DELETE'
            })
        }),

        createSpace: builder.mutation<void, IAddSpaceFormData>({
            query: (data) => ({
                url: '/tablecategoryservices',
                method: 'POST',
                data
            })
        }),

        switchSpaceStatus: builder.mutation({
            query: (data) => ({
                url: "/tablecategoryservices",
                method: "PUT",
                data
            })
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
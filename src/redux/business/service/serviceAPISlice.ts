import type { TService } from "@/pages/business/services/Services";
import { apiSlice } from "@/redux/APISlice";

export interface IBeseService {
    price: number,
    durationInMinutes: number,
    locales: {
        name: string,
        languageId: number,
        description: string 
    }[],
    businessStaffIds: number[] | [],
    fileIds: number[],
}

// fot service names
interface IService {
    id: number
    name: string
}

export interface IEditService extends IBeseService {
    serviceId: number | undefined,
}

export interface ICreateService extends IBeseService {
    categoryId: number,
}

export const serviceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllServiceNames: builder.query<IService[], void>({
            query: () => ({
                url: "/business/business-services",
                method: "GET"
            }),
            providesTags: ['Service']
        }),

        getServices: builder.query<TService[], number | undefined>({
            query: (categoryId) => ({
                url: `/categoryservices/services/${categoryId}`,
                method: "GET",
            }),
            providesTags: ['Service']
        }),

        getServicesById: builder.query<TService, number | undefined>({
            query: (categoryId) => ({
                url: `/categoryservices/${categoryId}`,
                method: "GET",
            }),
            providesTags: ['Service']
        }),

        editService: builder.mutation<void, IEditService>({
            query: (data) => ({
                url: '/categoryservices',
                method: "PUT",
                data: data,
            }),
            // invalidatesTags: ['Service']
            //! call this invalidation inside component after success to prevent rerenders aff parent components and show success message
        }),

        removeService: builder.mutation<void, number>({
            query: (serviceId) => ({
                url: `/categoryservices/${serviceId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Service']
        }),

        createService: builder.mutation<void, ICreateService>({
            query: (data) => ({
                url: "/categoryservices",
                method: "POST",
                data: data
            }),
            // invalidatesTags: ['Service']
            //! call this invalidation inside component after success to prevent rerenders aff parent components and show success message
        })

    })
})

export const {
    useGetAllServiceNamesQuery,
    useGetServicesQuery,
    useGetServicesByIdQuery,
    useEditServiceMutation,
    useRemoveServiceMutation,
    useCreateServiceMutation
} = serviceApiSlice
import type { IService } from "@/pages/business/services/Services";
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

export interface IEditService extends IBeseService {
    serviceId: number | undefined,
}

export interface ICreateService extends IBeseService {
    categoryId: number,
}

export const serviceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query<IService[], number | undefined>({
            query: (categoryId) => ({
                url: `/categoryservices/services/${categoryId}`,
                method: "GET",
            })
        }),

        getServicesById: builder.query<IService, number | undefined>({
            query: (categoryId) => ({
                url: `/categoryservices/${categoryId}`,
                method: "GET",
            })
        }),

        editService: builder.mutation<void, IEditService>({
            
            query: (data) => ({
                url: '/categoryservices',
                method: "PUT",
                data: data,
            }),
        }),

        removeService: builder.mutation<void, number>({
            query: (serviceId) => ({
                url: `/categoryservices/${serviceId}`,
                method: "DELETE"
            })
        }),

        createService: builder.mutation<void, ICreateService>({
            query: (data) => ({
                url: "/categoryservices",
                method: "POST",
                data: data
            })
        })

    })
})

export const {
    useGetServicesQuery,
    useGetServicesByIdQuery,
    useEditServiceMutation,
    useRemoveServiceMutation,
    useCreateServiceMutation
} = serviceApiSlice
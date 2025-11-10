import type { IAddLanguageFormData, IEditLanguageFormData } from "@/pages/admin/languages/components/AddLanguage";
import { apiSlice } from "@/redux/APISlice";

export interface IGetLanguages {
    id: number
    name: string,
    abbreviature: string,
    isRequired: boolean
}

export const languageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllLanguages: builder.query<IGetLanguages[], void>({
            query: () => ({
                url: "/admin/get-languages",
                method: "GET"
            }),
            providesTags: ['Language']
        }),

        getLanguageById: builder.query<IGetLanguages, number | undefined>({
            query: (languageId) => ({
                url: `/admin/get-language/${languageId}`,
                method: "GET"
            })
        }),

        addLanguage: builder.mutation<IAddLanguageFormData, IAddLanguageFormData>({
            query: (data) => ({
                url: "/admin/add-language",
                method: "POST",
                data
            }),
            invalidatesTags: ['Language']
        }),

        editLanguage: builder.mutation<IEditLanguageFormData, IEditLanguageFormData>({
            query: (data) => ({
                url: "/admin/edit-language",
                method: "POST",
                data
            }),
            invalidatesTags: ['Language']
        }),

        deleteLanguage: builder.mutation<void, number | undefined>({
            query: (languageId) => ({
                url: `/admin/delete-language/${languageId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Language']
        })

    })
})

export const {
    useGetAllLanguagesQuery,
    useGetLanguageByIdQuery,
    useAddLanguageMutation,
    useEditLanguageMutation,
    useDeleteLanguageMutation,
} = languageApiSlice
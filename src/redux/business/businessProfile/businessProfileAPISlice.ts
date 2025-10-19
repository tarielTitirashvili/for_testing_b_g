// import type { TBusinessBookingTime, IBusinessFormData } from '@/pages/business/businessProfile/BusinessProfile'
import type { IBusinessFormData } from '@/pages/business/businessProfile/BusinessProfile'
import { apiSlice } from '@/redux/APISlice'
import { toFormData, type IUploadPayload } from '@/utils/fileValidationCheckers'

// interface IBusinessProfile extends IBusinessFormData{
//   businessBookingTime: TBusinessBookingTime[]
// }

export const businessProfileAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessProfile: builder.query<IBusinessFormData, void>({
      query: () => ({
        url: '/business/get-business-profile',
        method: 'GET',
      }),
    }),

    editBusinessProfile: builder.mutation<void, IBusinessFormData>({
      query: (data) => ({
        url: '/business/edit-business-profile',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    uploadFile: builder.mutation<number[], IUploadPayload>({
      query: (payload) => {
        return{
        url: '/file/upload',
        method: 'POST',
        data: toFormData(payload),
      }},
    }),
  }),
})
// export const { useGetBusinessProfileQuery, useEditBusinessProfileMutation } = businessProfileAPISlice
export const {
  useGetBusinessProfileQuery,
  useUploadFileMutation,
  useEditBusinessProfileMutation,
} = businessProfileAPISlice

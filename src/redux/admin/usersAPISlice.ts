// import type { TBusinessBookingTime, IBusinessFormData } from '@/pages/business/businessProfile/BusinessProfile'
import type { TAdminUsers } from '@/pages/admin/users'
import { apiSlice } from '@/redux/APISlice'
// import { toFormData, type IUploadPayload } from '@/utils/fileValidationCheckers'

// interface IBusinessProfile extends IBusinessFormData{
//   businessBookingTime: TBusinessBookingTime[]
// }
type TGetAdminUsersQueryParams = {
  page: number
  offset: number // rows per page
  searchKey: string
  roleId: number | ''
  isBlocked: boolean
}

export const businessProfileAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<TAdminUsers, TGetAdminUsersQueryParams>({
      query: (params) => ({
        url: '/admin/get-users',
        method: 'GET',
        params
      }),
    }),

    // editBusinessProfile: builder.mutation<void, IBusinessFormData>({
    //   query: (data) => ({
    //     url: '/business/edit-business-profile',
    //     method: 'PUT',
    //     data: data,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }),
    // }),

    // // put in separate folder
    // uploadFile: builder.mutation<number[], IUploadPayload>({
    //   query: (payload) => {
    //     return{
    //     url: '/file/upload',
    //     method: 'POST',
    //     data: toFormData(payload),
    //   }},
    // }),
  }),
})
// export const { useGetBusinessProfileQuery, useEditBusinessProfileMutation } = businessProfileAPISlice
export const {
  useGetAdminUsersQuery,
  // useUploadFileMutation,
  // useEditBusinessProfileMutation,
} = businessProfileAPISlice
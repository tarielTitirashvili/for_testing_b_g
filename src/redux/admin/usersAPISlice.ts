// import type { TBusinessBookingTime, IBusinessFormData } from '@/pages/business/businessProfile/BusinessProfile'
import type { TAdminUsers, TUserRole } from '@/pages/admin/users'
import { apiSlice } from '@/redux/APISlice'
// import { toFormData, type IUploadPayload } from '@/utils/fileValidationCheckers'

// interface IBusinessProfile extends IBusinessFormData{
//   businessBookingTime: TBusinessBookingTime[]
// }
type TGetAdminUsersQueryParams = {
  page: number
  offset: number // rows per page
  searchKey: string
  roleId: string | ''
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
      providesTags: ['adminUsers']
    }),
    getUserRoles: builder.query<TUserRole[], void>({
      query: () => ({
        url: '/admin/get-roles',
        method: 'GET',
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
    deleteUser: builder.mutation<void, {userId: string}>({
      query: (payload) => {
        return{
        url: `/admin/delete-user/${payload.userId}`,
        method: 'DELETE',
      }},
      invalidatesTags: ['adminUsers'],
    }),
  }),
})
// export const { useGetBusinessProfileQuery, useEditBusinessProfileMutation } = businessProfileAPISlice
export const {
  useGetAdminUsersQuery,
  useDeleteUserMutation,
  useGetUserRolesQuery
  // useUploadFileMutation,
  // useEditBusinessProfileMutation,
} = businessProfileAPISlice
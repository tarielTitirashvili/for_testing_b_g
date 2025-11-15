// import type { TBusinessBookingTime, IBusinessFormData } from '@/pages/business/businessProfile/BusinessProfile'
import type { TAdminUsers, TUserRole } from '@/pages/admin/users'
import { apiSlice } from '@/redux/APISlice'
import type dayjs from 'dayjs'
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

export type TAdminUsersUserEditParams = {
  id: string
  roleId: string
  isBlocked: boolean
  firstName: string
  lastName: string
  birthDate: dayjs.Dayjs
  email: string
  phoneNumber: string | null
  genderId: number | null
}


export const usersAPISlice = apiSlice.injectEndpoints({
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

    editAdminUser: builder.mutation<void, TAdminUsersUserEditParams>({
      query: (data) => ({
        url: '/admin/edit-user',
        method: 'POST',
        data: data,
      }),
    }),

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

export const {
  useGetAdminUsersQuery,
  useDeleteUserMutation,
  useGetUserRolesQuery,
  useEditAdminUserMutation
} = usersAPISlice
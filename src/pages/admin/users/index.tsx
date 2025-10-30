import React, { useState } from 'react'
import {
  useGetAdminUsersQuery,
  useGetUserRolesQuery,
} from '@/redux/admin/usersAPISlice'
import AdminUsersTable from './AdminUsersTable'
import CustomPagination from '@/components/shared/pagination'
import TextInput from '@/components/shared/inputs/TextInput'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import CustomCheckbox from '@/components/shared/customCheckbox'
import useDebouncedValue from '@/hooks/useDebouncedValue'
import Loader from '@/components/shared/loader'
import SelectDropDown from '@/components/shared/inputs/SelectDropDown'

export type TAdminUsersUser = {
  id: string
  role: {
    id: string
    name: string
  }
  isBlocked: boolean
  firstName: string
  lastName: string
  birthDate: string | null
  email: string
  phoneNumber: string | null
  genderId: number | null
}

// type Props = {}
export type TAdminUsers = {
  data: TAdminUsersUser[]
  totalItemCount: number
  pageCount: number
  page: number
  offset: number
}

export type TUserRole = {
  id: string
  name: string
}

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchKey, setSearchKey] = useState('')
  const debouncedSearchKey = useDebouncedValue(searchKey, 400)
  const [isBlocked, setIsBlocked] = useState(false)
  const [selectedRole, setSelectedRole] = useState<TUserRole | null>(null)

  const { data, isLoading, isError, isFetching } = useGetAdminUsersQuery({
    page: currentPage,
    offset: 10,
    searchKey: debouncedSearchKey,
    roleId: selectedRole?.id || '',
    isBlocked: isBlocked,
  })
  const { data: users } = data || {}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value)
    setCurrentPage(1)
  }
  const { data: roles } = useGetUserRolesQuery()
  // console.log(roles)
  const { t } = useTranslation()

  // console.log(data)
  // console.log(currentPage)

  if (isLoading || !users) return <div>Loading...</div>
  if (isError) return <div>Error loading users</div>

  return (
    <div className="bg-white rounded-xl py-12 px-5">
      <Loader loading={isLoading || isFetching}>
        <div className="flex gap-3 py-4">
          <div className="reviews_header-search relative text-[#6C6C6C]">
            <Search
              className="absolute top-[55%] -translate-y-1/2 left-[10px]"
              size={15}
            />
            <TextInput
              placeholder={t('bookings.button.search')}
              className="pl-[30px] max-w-[300px] w-full border-[#EBEBEB]"
              value={searchKey}
              onChange={handleChange}
            />
          </div>
          <CustomCheckbox
            checked={isBlocked}
            id={'isBlocked'}
            label={'Blocked Users'}
            clickChecked={() => {
              setIsBlocked((prev) => !prev)
              setCurrentPage(1)
            }}
          />
          <SelectDropDown
            placeholder="Select Role"
            options={roles ?? []}
            value={selectedRole?.id ? selectedRole.id : ''}
            sentId
            onChange={(e) => {
              const selectedRole = roles
                ? roles.find((role) => role.id === e.target.value)
                : null
              setSelectedRole(selectedRole || null)
            }}
          />
        </div>
        <AdminUsersTable adminUsers={users} />
        <CustomPagination
          currentPage={currentPage}
          totalPages={data?.pageCount || 1}
          onPageChange={(page: number) => setCurrentPage(page)}
          containerClassname="justify-center mt-4 w-full"
          paginationContentContainerClassname="flex justify-center"
          pagesContainerClassname="w-[200px] justify-center"
        />
      </Loader>
    </div>
  )
}

export default Users

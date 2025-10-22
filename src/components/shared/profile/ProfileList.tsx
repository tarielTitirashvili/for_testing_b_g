import { useState, type FunctionComponent } from 'react'

// import { Link } from 'react-router-dom'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Search } from 'lucide-react'

import TextInput from '@/components/shared/inputs/TextInput'
// import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import ProfileListItem from './ProfileListItem'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/redux/auth/authSlice'
import type { IBusiness } from './Profile'
import { currentBusinessSelector } from '@/redux/auth/authSelectors'
import { useSwitchProfileMutation } from '@/redux/business/userProfiles/userProfilesAPISlice'
import Loader from '../loader'
import { useTranslation } from 'react-i18next'

interface IProfileListProps {
  businesses: IBusiness[] | []
}
export type TSwitchProfileData = {
  businessId: string //"3fa85f64-5717-4562-b3fc-2c963f66afa6",
  roleId: string
}

const ProfileList: FunctionComponent<IProfileListProps> = ({ businesses }) => {
  const dispatch = useDispatch()
  const currentBusiness = useSelector(currentBusinessSelector)
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')

  const [switchProfileMutation, { isLoading }] = useSwitchProfileMutation()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const logoutTrigger = () => {
    dispatch(logout())
  }

  return (
    <Card className="w-full left-0 h-auto rounded-md shadow-none pt-3 pb-1 border-2 gap-3 relative flex flex-col bg-white z-[1]">
      <CardHeader className="px-3 py-0">
        <b className='text-[#242424] text-[14px] font-medium'>
          {t('titles.headers.yourAccounts')} ({businesses.length})
        </b>
        <div className="card_header_input-block relative w-full">
          <TextInput
            placeholder="Find Your Business"
            className="pl-[35px]"
            value={search}
            onChange={handleSearchChange}
          />
          <Search
            size={20}
            className="absolute top-[50%] -translate-y-[40%] left-[10px] text-[#6C6C6C]"
          />
        </div>
      </CardHeader>
      <Loader loading={isLoading}>
        <CardContent className="px-3 pt-4 border-t-2 flex-1 flex flex-col gap-2 overflow-auto scrollbar">
          {businesses.map((business) => {
            const handleSwitchProfile = () => {
              switchProfileMutation({
                businessId: business.id,
                roleId: business.role.id,
              })
            }
            const renderBusiness = (
              <ProfileListItem
                profilePictureUrl={business.file?.url}
                key={business.id}
                handleSwitchProfile={handleSwitchProfile}
                businessName={business.name}
                status={business.role.name}
                accValue={business.id}
                checked={business.id === currentBusiness}
              />
            )
            if (search === '') {
              return renderBusiness
            } else if (business.name.includes(search)) {
              return renderBusiness
            } else {
              return <></>
            }
          })}
        </CardContent>
      </Loader>
      <CardFooter className="gap-2 px-3 pt-1 pb-1 flex">
        <SecondaryButton
          onClick={logoutTrigger}
          className="py-2 text-sm font-semibold flex-1"
        >
          {t('titles.logout')}
        </SecondaryButton>
        {/* <Link to={'/add-business'} className='flex-1'>
                    <PrimaryButton className='py-2 text-sm font-semibold flex items-center justify-center gap-0.5 border-2' icon={<Plus size={15} strokeWidth={3} />}>
                        Add
                    </PrimaryButton>
                </Link> */}
      </CardFooter>
    </Card>
  )
}

export default ProfileList

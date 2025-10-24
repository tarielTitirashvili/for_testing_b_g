

// import { api } from '@/api/api'
import { useState, type FunctionComponent } from 'react'
import { BusinessProfilesSelector, selectedBusinessProfileSelector } from '@/redux/auth/authSelectors'
import { useSelector } from 'react-redux'

import ProfileList from '@/components/shared/profile/ProfileList'
import BusinessAvatar from './BusinessAvatar'
import Loader from '../loader'

interface IRole {
  id: string
  name: string
}

type ICategory = {
  id: 1 | 2
  name: string
}

type TFile ={
  url: string
  isProfile: boolean
  id: number
}

export interface IBusiness {
  role: IRole
  file?: TFile | null | undefined
  id: string
  name: string
  businessCategory: ICategory
}

const Profile: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false)

  const selectedBusinessProfile = useSelector(selectedBusinessProfileSelector)

  const businesses = useSelector(BusinessProfilesSelector)

  return (
    <div>
      <Loader loading={businesses?.length === 0}>
        <BusinessAvatar
          business={selectedBusinessProfile}
          handleProfileList={() => setOpen((prev) => !prev)}
        />
        {open && (
          <div className="list absolute top-[110%] right-0 min-w-full">
            <ProfileList businesses={businesses || []} />
          </div>
        )}
      </Loader>
    </div>
  )
}

export default Profile
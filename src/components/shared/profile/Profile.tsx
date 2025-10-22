// import { api } from '@/api/api'
import ProfileList from '@/components/shared/profile/ProfileList'
import { useState, type FunctionComponent } from 'react'
import BusinessAvatar from './BusinessAvatar'
import { useGetUserProfilesQuery } from '@/redux/business/userProfiles/userProfilesAPISlice'
import Loader from '../loader'
import { currentBusinessSelector } from '@/redux/auth/authSelectors'
import { useSelector } from 'react-redux'

interface IRole {
  id: string
  name: string
}

type ICategory = {
  id: number
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

// interface IBusinessInfo {
//     name: string
// }

const Profile: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false)

  //   const [businesses, setBusinesses] = useState<IBusiness[]>([])
  // const [business, setBusiness] = useState<IBusiness | null>(null)

  // console.log(businesses)

  //   const fetchBusinesses = async () => {
  //     const res = await api.get<IBusiness[]>('/business/user-profiles')
  //     const result = res.data
  //     setBusinesses(result)
  //   }

  //   const fetchBusiness = async () => {
  //     const res = await api.get('business/get-business-profile')
  //     const result = res.data
  //     setBusiness(result)
  //   }

  const { data: businesses, isLoading } = useGetUserProfilesQuery()
  //   useEffect(() => {
  // fetchBusinesses()
  // fetchBusiness()
  //   }, [])
  const currentBusiness = useSelector(currentBusinessSelector)
  const selectedBusinessProfile = businesses?.find(business => business.id === currentBusiness)

  // console.log(businesses)

  return (
    <div>
      <Loader loading={isLoading}>
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

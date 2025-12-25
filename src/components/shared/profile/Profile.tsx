import { useEffect, useRef, useState, type FunctionComponent } from 'react'
import { BusinessProfilesSelector, selectedBusinessProfileSelector } from '@/redux/auth/authSelectors'
import { useSelector } from 'react-redux'

import ProfileList from '@/components/shared/profile/ProfileList'
import BusinessAvatar from './BusinessAvatar'
import Loader from '../loader'
import type { RootState } from '@/redux/store'
import { USER_ROLES } from '@/redux/auth/authSlice'

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
  isActive: boolean
  name: string
  businessCategory: ICategory
}

const Profile: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selectedBusinessProfile = useSelector(selectedBusinessProfileSelector)

  const businesses = useSelector(BusinessProfilesSelector)
  const role = useSelector((state: RootState) => state.auth.role)

  useEffect(() => {
    const handelOutslideClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false)
    }

    document.addEventListener('mousedown', handelOutslideClick)

    return () => document.removeEventListener('mousedown', handelOutslideClick)
  }, [])

  return (
    <div ref={wrapperRef}>
      <Loader loading={businesses?.length === 0 && role !== USER_ROLES.ADMINISTRATOR}>
        <BusinessAvatar
          business={selectedBusinessProfile}
          handleProfileList={() => setOpen((prev) => !prev)}
        />
        {open && (
          <div className="list absolute top-[110%] right-0 min-w-[320px] z-999999999999">
            <ProfileList businesses={businesses || []} />
          </div>
        )}
      </Loader>
    </div>
  )
}

export default Profile
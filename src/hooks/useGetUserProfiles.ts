import { useGetUserProfilesQuery } from '@/redux/business/userProfiles/userProfilesAPISlice'
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setBusinessProfiles, setSelectedBusinessProfile } from '@/redux/auth/authSlice'
import { currentBusinessSelector } from '@/redux/auth/authSelectors'
import type { RootState } from '@/redux/store'

export const useGetUserProfiles = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const { data: businesses, isSuccess } = useGetUserProfilesQuery(undefined, {skip: !isAuth})
  const currentBusiness = useSelector(currentBusinessSelector)
  
  const dispatch = useDispatch()
  useEffect(()=>{
    if(businesses?.length && isSuccess ){
      dispatch(setBusinessProfiles(businesses))
      const selectedBusinessProfile = businesses?.find(business => business.id === currentBusiness)
      if(selectedBusinessProfile)
        dispatch(setSelectedBusinessProfile(selectedBusinessProfile))
    }
  },[isSuccess, businesses, dispatch, currentBusiness])
}

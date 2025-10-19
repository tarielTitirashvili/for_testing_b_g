import type { RootState } from '@/redux/store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const NotFound = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const isAuth = useSelector((state:RootState)=>state.auth.isAuth)

  useEffect(()=>{
    //! runs on change-password reload end redirects to login page 
    if(location.pathname.toLowerCase() === "/change-password" && !isAuth)
      navigate('/')
  },[])

  return (
    <div>
      <h1>
        404 Not Found
      </h1>
    </div>
  )
}

export default NotFound
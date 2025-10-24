import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import type { RootState } from '@/redux/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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

  const {t} = useTranslation()

  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-white rounded-xl py-12 px-4 gap-5'>
      <img src='/assets/images/404.svg' />
      <h1 className='max-w-[310px] text-center'>
        {t('notFountPage.notFoundPage.title')}
      </h1>
      <div>
        <PrimaryButton handleClick={()=>navigate('/')} className='px-8' >
          {t('notFoundPage.returnToMainPage.buttonText')}
        </PrimaryButton>
      </div>
    </div>
  )
}

export default NotFound
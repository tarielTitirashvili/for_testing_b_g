import { useEffect } from 'react'

import AllRoutes from './routes'

import dayjs from 'dayjs'

import './fonts.css'

// ssr test for 1 page option is node server which will return static html css file
// calendar library test


// i18n configuration
const App = () => {
  useEffect(() => {
    dayjs.locale('ka')
  }, [])

  return (
    <div className="font-[FiraGO] w-full max-w-full bg-[#EFF0F1] min-h-[100svh]">
        <AllRoutes />
    </div>
  )
}

export default App;
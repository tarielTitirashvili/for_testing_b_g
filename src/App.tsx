import AllRoutes from './routes'

import dayjs from 'dayjs'
import'dayjs/locale/ka'

import './fonts.css'
import { Toaster } from 'sonner'
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

const App = () => {
  dayjs.locale('ka')

  return (
    <div className="font-[FiraGO] w-full max-w-full bg-[#EFF0F1] min-h-[100svh]">
      {/* this toaster is for ./utils/createTost.tsx do not delete without checking ./utils/createTost.tsx */}
      <Toaster position='top-center' id='global-error-notifier' richColors />
      <AllRoutes />
    </div>
  )
}

export default App;
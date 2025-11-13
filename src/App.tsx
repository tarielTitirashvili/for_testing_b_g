import AllRoutes from './routes'

import dayjs from 'dayjs'
import'dayjs/locale/ka'

import './fonts.css'
import { Toaster } from 'sonner'

const App = () => {
  dayjs.locale('ka')

  return (
    <div className="font-[FiraGO] w-full max-w-full bg-[#EFF0F1] min-h-[100svh]">
      <Toaster position='top-center' id='global-error-notifier' richColors />
      <AllRoutes />
    </div>
  )
}

export default App;
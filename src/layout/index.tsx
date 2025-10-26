import { Outlet, useLocation } from 'react-router-dom'

import { SidebarProvider } from '@/components/ui/sidebar'

import { Toaster } from 'sonner'

import Aside from './Aside'
import Header from './Header'

const Layout = () => {
  
  const location = useLocation()
  const basePathName = '/' + location.pathname.split('/')[1]

  return (
    <div className="max-w-screen w-full min-h-screen flex">
      <SidebarProvider>
        <Aside
          basePathName={basePathName}
        />
        <main className="flex-1 w-[calc(100vw-16rem)] overflow-auto">
          <Header
            basePathName={basePathName}
          />
          <div className="p-2.5 sm:p-5 overflow-x-auto w-full">
            <Outlet />
          </div>
          <Toaster />
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Layout

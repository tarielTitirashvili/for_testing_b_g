import { Outlet } from 'react-router-dom'

import { SidebarProvider } from '@/components/ui/sidebar'

import { Toaster } from 'sonner'

import Aside from './Aside'
import Header from './Header'
import { useState } from 'react'

const Layout = () => {

  const [path, setPath] = useState<string | null>(location.pathname)

  return (
    <div className="max-w-screen w-full min-h-screen flex">
      <SidebarProvider>
        <Aside
          path={path}
          setPath={setPath}
        />
        <main className='flex-1 w-[calc(100vw-16rem)] overflow-auto'>
          <Header
            locationPathname={path}
          />
          <div className='p-2.5 sm:p-5 overflow-x-auto w-full'>
            <Outlet />
          </div>
          <Toaster />
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Layout

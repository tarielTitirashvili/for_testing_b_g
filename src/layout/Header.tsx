import { type FunctionComponent } from 'react'

import { SidebarTrigger } from '@/components/ui/sidebar'

import { t } from 'i18next'
import Profile from '@/components/shared/profile/Profile'
interface IHeaderProps {
  basePathName: string | null
}

const Header: FunctionComponent<IHeaderProps> = ({ basePathName }) => {


  return (
    <header className="flex items-center justify-between bg-white p-5">
      <div className="title capitalize font-medium text-2xl flex items-center gap-2">
        <div className="sidebar_menu-btn">
          <SidebarTrigger />
        </div>
        {basePathName && basePathName == '/'
          ? t('sidebar.link.')
          : t(
              `sidebar.link.${
                basePathName &&
                basePathName.slice(1)
              }`
            )}
      </div>
      <div className="profile relative max-w-[320px] w-full flex justify-end">
        <Profile />
      </div>
    </header>
  )
}

export default Header

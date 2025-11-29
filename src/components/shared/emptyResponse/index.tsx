import { FolderSearch } from 'lucide-react'
import type React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  containerClassName?: string
  iconClassName?: string
  customMessage?: string | React.ReactNode
}

const EmptyResponse = (props: Props) => {
  const { containerClassName, iconClassName, customMessage } = props
  const { t } = useTranslation()

  return (
    <div
      className={`w-full flex flex-col justify-center items-center h-80 ${containerClassName}`}
    >
      <FolderSearch className={`w-35 h-35 stroke-[#6C6C6C] ${iconClassName}`} />
      <h6 className='text-[#6C6C6C] text-[22px]'>{customMessage ? customMessage : t('business.texts.noDataWasFound')}</h6>
    </div>
  )
}

export default EmptyResponse

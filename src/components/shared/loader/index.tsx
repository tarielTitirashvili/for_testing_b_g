import { LoaderCircle } from 'lucide-react'
import type React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  className?: string
  containerClassname?: string
  loadingContainerClassName?: string
  size?: 'screen' | 'small'
  children?: React.ReactNode
  loading?: boolean
}

const Loader = (props: Props) => {
  const {
    className,
    containerClassname,
    loadingContainerClassName,
    size = 'small',
    children,
    loading = false,
  } = props
  const { t } = useTranslation()
  const screenSize = size === 'screen'

  if (loading !== undefined && children) {
    return (
      <span className={`relative ${loadingContainerClassName}`}>
        {loading && (
          <div
            className={`flex 
          ${screenSize ? 'width-full' : ''} 
          ${screenSize ? 'h-screen' : ''}
          justify-center 
          items-center 
          bg-[#FFFFFF70]
          absolute 
          h-full w-full
          left-0
          top-0 
          z-[90000000]
          rounded-xl
          cursor-wait!
          ${containerClassname ? containerClassname : ''}`}
          >
            <span className="flex items-center justify-center">
              <LoaderCircle
                className={`animate-spin text-button-color ${className ?? ''}`}
                size={32}
                strokeWidth={2}
              />
            </span>
          </div>
        )}
        {children}
      </span>
    )
  }

  return (
    <div
      className={`flex 
      ${screenSize ? 'width-full' : ''} 
      ${screenSize ? 'h-screen' : ''}
      justify-center 
      items-center 
      relative
      cursor-wait!
      ${containerClassname ? containerClassname : ''}`}
    >
      {t('common.loading.text')}
      <LoaderCircle
        className={`animate-spin text-button-color ${className ?? ''}`}
        size={32}
        strokeWidth={2}
      />
    </div>
  )
}

export default Loader

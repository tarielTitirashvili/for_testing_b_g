import { LoaderCircle } from 'lucide-react'
import type React from 'react'

type Props = {
  className?: string
  containerClassname?: string
  size?: 'screen' | 'small'
  children?: React.ReactNode
  loading?: boolean
}

const Loader = (props: Props) => {
  const {
    className,
    containerClassname,
    size = 'small',
    children,
    loading,
  } = props

  const screenSize = size === 'screen'

  if (loading !== undefined && children) {
    if(!loading){
      return<>{children}</>
    }
    return<span className='relative'>
      <div
        className={
          `flex 
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
          ${containerClassname ? containerClassname : ''}`
        }
      >
        <span className="flex items-center justify-center">
          <LoaderCircle
            className={`animate-spin text-[#ef7800] ${className ?? ''}`}
            size={32}
            strokeWidth={2}
            />
        </span>
      </div>
        {children}
    </span>
  }

  return (
    <div
      className={`flex 
      ${screenSize ? 'width-full' : ''} 
      ${screenSize ? 'h-screen' : ''}
      justify-center 
      items-center 
      relative
      ${containerClassname ? containerClassname : ''}`}
    >
      Loading...
      <LoaderCircle
        className={`animate-spin text-[#ef7800] ${className ?? ''}`}
        size={32}
        strokeWidth={2}
      />
      {children}
    </div>
  )
}

export default Loader

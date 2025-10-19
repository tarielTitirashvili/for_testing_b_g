import { useEffect, useRef } from 'react'

export function useDetectOutsideClick<T extends HTMLElement>(
  onClose: () => void,
  shouldClose: boolean
) {
  const ref = useRef<T>(null)
  const preventCloseOnFirstClick = useRef<boolean>(true)

  useEffect(() => {
    if (shouldClose) {
      if (preventCloseOnFirstClick.current) {
        preventCloseOnFirstClick.current = false
      } else {
        preventCloseOnFirstClick.current = true
        onClose()
      }
    }
  }, [shouldClose, onClose])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return ref
}

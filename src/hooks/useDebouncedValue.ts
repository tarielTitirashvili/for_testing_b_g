import { useEffect, useState } from 'react'

const useDebouncedValue = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay || 400)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  console.log('debouncedValue', debouncedValue)
  return debouncedValue
}

export default useDebouncedValue

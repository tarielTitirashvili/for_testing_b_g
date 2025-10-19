import { Dialog, DialogTitle } from '@/components/ui/dialog'
import { useEffect } from 'react'

type TProps = {
  message: string
  toggle?: () => void
  open?: boolean
}

export function DialogDemo(props: TProps) {
  const { message, toggle=()=>{}, open } = props

  useEffect(() => {
    setTimeout(() => {
      toggle()
    }, 10000)
  }, [])

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogTitle>{message}</DialogTitle>
    </Dialog>
  )
}

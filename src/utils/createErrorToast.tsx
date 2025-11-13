import { toast } from 'sonner'

const createErrorToast = (title?: string, text?: string, duration?: number) => {
  toast.error(title, {
    description: text,
    duration: duration || 4000,
    toasterId: 'global-error-notifier',
    classNames: {
      toast: 'bg-[#FDE9E9]! border-2! border-[#E81C1C]! t-5!',
      closeButton: 'right-[-17px]! left-auto!',
      error: 'bg-red! text-[#242424]!',
      icon: 'bg-red! text-[#E81C1C]!',
    },
    closeButton: true,
  })
}

export default createErrorToast

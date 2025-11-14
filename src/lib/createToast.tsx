import { toast } from 'sonner'

const createErrorToast = (title?: string, text?: string, duration?: number) => {
  toast.error(title, {
    description: text,
    duration: duration || 5000,
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

const createSuccessToast = (title: string, duration?: number) => {
    toast.success(title, {
    // description: text,
    duration: duration || 5000,
    toasterId: 'global-error-notifier',
    classNames: {
      toast: 'bg-[#E6F9ED]! border-2! border-[#21C55D]! t-5!',
      closeButton: 'right-[-17px]! left-auto!',
      error: 'bg-red! text-[#242424]!',
      icon: 'bg-red! text-[#21C55D]!',
    },
    closeButton: true,
  })
}

const createToast = {
  error: createErrorToast,
  success: createSuccessToast
}

export default createToast
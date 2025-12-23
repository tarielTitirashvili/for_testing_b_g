import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

type TProps = {
  value: string
  setValue: (value: string) => void
  disabled: boolean
}

export function InputOTPDemo(props: TProps) {
  const { value, setValue, disabled=false } = props
  return (
    <InputOTP maxLength={6} value={value} disabled={disabled} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot className="w-8 sm:w-12 h-8 sm:h-12" index={0} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot className="w-8 sm:w-12 h-8 sm:h-12" index={1} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot className="w-8 sm:w-12 h-8 sm:h-12" index={2} />
      </InputOTPGroup>
      <span className="flex">
        <span className="w-4 h-0.5 bg-[#EBEBEB]"></span>
      </span>
      <InputOTPGroup>
        <InputOTPSlot className="w-8 sm:w-12 h-8 sm:h-12" index={3} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot className="w-8 sm:w-12 h-8 sm:h-12" index={4} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot className="w-8 sm:w-12 h-8 sm:h-12" index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

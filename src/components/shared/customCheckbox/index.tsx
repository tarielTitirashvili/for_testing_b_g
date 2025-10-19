import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type Props = {
  id: string
  label?: string
  checked: boolean
  clickChecked?: () => void
  className?: string
}

const CustomCheckbox = (props: Props) => {
  const { id, label, checked, clickChecked, className } = props
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={clickChecked}  
        className="w-4.5 h-4.5 data-[state=checked]:bg-[#EF7800] data-[state=checked]:border-[#EF7800] border-[#AEAEAE] border-[2px] transition-all delay-10"
      />
      { label && (
        <Label className="font-normal text-sm" htmlFor={id}>
          {label}
        </Label>
      ) }
    </div>
  )
}

export default CustomCheckbox

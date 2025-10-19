import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  // changed optional label added:
  label?: string
}

const CustomSwitch = (props: Props) => {
  const { className, label } = props
  return (
    <div className={`flex w-full gap-2 align-middle`}>
      <Switch
        id="airplane-mode"
        className={cn(
          "data-[state=checked]:bg-[#EF7800] bg-[#EFF0F1] [&>span]:h-[0.8rem] [&>span]:w-[0.8rem] [&>span]:translate-x-[2px] data-[state=checked]:[&>span]:translate-x-[1rem]",
          className
        )}
      />
      
      {/* changed */}
      {label && <Label htmlFor={label}>{ label }</Label>}
    </div>
  )
}

export default CustomSwitch

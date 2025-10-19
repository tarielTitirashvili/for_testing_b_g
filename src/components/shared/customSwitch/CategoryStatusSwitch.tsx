import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import type { FunctionComponent } from "react"

interface ICategoryStatusSwitchProps {
    className?: string
    label?: string
    checked?: boolean
    onChecked?: (checked: boolean) => void
}

const CategoryStatusSwitch: FunctionComponent<ICategoryStatusSwitchProps> = ({ className, label, checked, onChecked }) => {
    return (
        <div className="flex w-full gap-2 items-center">
            <Switch
                className={cn(
                    "data-[state=checked]:bg-[#EF7800] bg-[#EFF0F1] [&>span]:h-[0.8rem] [&>span]:w-[0.8rem] data-[state=unchecked]:[&>span]:translate-x-[0.1rem] data-[state=checked]:[&>span]:translate-x-[1rem]",
                    className
                )}
                checked={checked}
                onCheckedChange={onChecked}
            />
            {label && <Label htmlFor={label}>{ label }</Label>}
        </div>
    )
}

export default CategoryStatusSwitch
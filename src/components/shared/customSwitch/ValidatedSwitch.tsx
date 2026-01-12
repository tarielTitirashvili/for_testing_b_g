import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form'

interface IValidatedSwitchProps<TFieldValues extends FieldValues> extends UseControllerProps<TFieldValues> {
    onClick?: () => void
    label?: string
    className?: string
}

function ValidatedSwitch<TFieldValues extends FieldValues>(
  props: IValidatedSwitchProps<TFieldValues>
) {

    const { field, fieldState } = useController(props)

    return (
        <div
            onClick={props.onClick}
            className='flex w-full gap-2 items-center'
        >
            <Switch
                className={cn(
                    "data-[state=checked]:bg-button-color bg-[#EFF0F1] [&>span]:h-[0.8rem] [&>span]:w-[0.8rem] data-[state=unchecked]:[&>span]:translate-x-[0.1rem] data-[state=checked]:[&>span]:translate-x-[1rem]",
                    props.className
                )}
                checked={field.value}
                onCheckedChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
            />
            {props.label && <Label htmlFor={props.label}>{ props.label }</Label>}
            {fieldState.error && (
                <span className="text-red-500 text-sm">{fieldState.error.message}</span>
            )}
        </div>
    )
}

export default ValidatedSwitch

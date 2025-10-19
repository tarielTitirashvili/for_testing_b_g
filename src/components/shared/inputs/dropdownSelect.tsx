import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslation } from 'react-i18next'

type Option<T> = {
  id: T
  value: T
  label: string
}

type Props<T> = {
  value: T
  options: Option<T>[]
  placeholder?: string
  label?: string
  onChange: (value: T) => void
  className?: string
}

function DropdownSelect<T extends string | number>({
  value,
  options,
  placeholder = "Select an option",
  label,
  onChange,
  className
}: Props<T>) {
  const { t } = useTranslation()

  return (
    <Select value={String(value)} onValueChange={(val) => onChange?.(val as T)}>
      <SelectTrigger className={`w-full min-w-[180px] ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{t(label)}</SelectLabel>}
          {options.map((opt) => (
            <SelectItem key={String(opt.id)} value={String(opt.id)} className='data-[highlighted]:bg-[#FEF2E6] data-[state=checked]:bg-[#FEF2E6]'>
              {t(opt.label)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DropdownSelect